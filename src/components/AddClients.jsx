import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/GraphMutations";
import { GET_CLIENTS } from "../queries/GraphQueries";
function AddClient({ show, setShow }) {
  const handleClose = () => setShow(false);

  const emailRegex = RegExp(/^\S+@\S+\.\S+$/);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => {
      addClient(values);
      handleClose();
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.phone) {
        errors.phone = "Required";
      }
      return errors;
    },
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { ...formik.values },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add client</Modal.Title>
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
              className="add-client-input"
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="error">{formik.errors.name}</p>
            ) : (
              ""
            )}
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="email address"
              className="add-client-input"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="error">{formik.errors.email}</p>
            ) : (
              ""
            )}
            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone number"
              className="add-client-input"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p className="error">{formik.errors.phone}</p>
            ) : (
              ""
            )}

            <Modal.Footer>
              <button
                variant="secondary"
                onClick={handleClose}
                className="cancel"
              >
                Close
              </button>
              <button type="submit" className="submit">
                Submit
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddClient;
