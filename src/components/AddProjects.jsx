import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/GraphMutations";
import { GET_CLIENTS, GET_PROJECTS } from "../queries/GraphQueries";
function AddProject({ showProject, setShowProject }) {
  const handleProjectClose = () => setShowProject(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: "new",
      clientId: "",
    },
    onSubmit: (values) => {
      addProject(values);
      handleProjectClose();
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.description) {
        errors.description = "Required";
      }
      if (!values.status) {
        errors.status = "Required";
      }
      if (!values.clientId) {
        errors.clientId = "Required";
      }
      return errors;
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { ...formik.values },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  if (loading) return null;
  if (error) return <p>An error occurred</p>;
  return (
    <>
      {!loading && !error && (
        <Modal show={showProject} onHide={handleProjectClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" onSubmit={formik.handleSubmit}>
              <input
                value={formik.values.name}
                onChange={formik.handleChange}
                type="text"
                name="name"
                id="name"
                placeholder="name"
                className="add-project-input"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="error">{formik.errors.name}</p>
              ) : (
                ""
              )}
              <textarea
                value={formik.values.description}
                onChange={formik.handleChange}
                type="description"
                name="description"
                id="description"
                placeholder="description"
                className="add-project-text"
                rows={5}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <p className="error">{formik.errors.description}</p>
              ) : (
                ""
              )}
              <select
                value={formik.values.status}
                onChange={formik.handleChange}
                name="status"
                id="status"
                placeholder="Status"
                className="add-project-input"
              >
                <option value="new">Not started</option>
                <option value="progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
              {formik.touched.status && formik.errors.status ? (
                <p className="error">{formik.errors.status}</p>
              ) : (
                ""
              )}

              <select
                value={formik.values.clientId}
                onChange={formik.handleChange}
                name="clientId"
                id="clientId"
                placeholder="Client"
                className="add-project-input"
              >
                <option value="new">select client</option>
                {data.clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              {formik.touched.clientId && formik.errors.clientId ? (
                <p className="error">{formik.errors.clientId}</p>
              ) : (
                ""
              )}

              <Modal.Footer>
                <button
                  variant="secondary"
                  onClick={handleProjectClose}
                  className="cancel"
                >
                  Close
                </button>
                <button type="submit" className="submit">
                  Add
                </button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default AddProject;
