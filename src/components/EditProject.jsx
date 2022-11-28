import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/GraphMutations";
import {
  GET_PROJECT,
} from "../queries/GraphQueries";
function EditProject({ show, setShow, initValues }) {
  const handleProjectClose = () => setShow(false);

  const formik = useFormik({
    initialValues: {
      name: initValues.name,
      description: initValues.description,
      status: "",
    },
    onSubmit: (values) => {
        updateProject(values);
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
      return errors;
    },
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { ...formik.values, id: initValues.id },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: initValues.id } }],
  });
  return (
    <>
      <Modal show={show} onHide={handleProjectClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
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

            <Modal.Footer>
              <button
                variant="secondary"
                onClick={handleProjectClose}
                className="cancel"
              >
                Close
              </button>
              <button type="submit" className="submit">
                Update
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditProject;
