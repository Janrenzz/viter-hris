import React from "react";
import * as Yup from "yup";
import { StoreContext } from "../../../store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../functions/custom-hooks/queryData";
import { apiVersion } from "../../../functions/functions-general";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../store/StoreAction";
import ModalWrapperSide from "../../../partials/modals/ModalWrapperSide";
import { FaTimes } from "react-icons/fa";
import { Form, Formik } from "formik";
import { InputText } from "../../../components/form-input/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import MessageError from "../../../partials/MessageError";

const ModalAddEmployees = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit
          ? `${apiVersion}/controllers/developers/employees/employees.php?id=${itemEdit.employee_aid}`
          : `${apiVersion}/controllers/developers/employees/employees.php`,
        itemEdit ? "PUT" : "POST",
        values,
      ),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setIsAdd(false));
        dispatch(setMessage(`Succesfully ${itemEdit ? "updated" : "added"}`));
      }

      if (data.success == false) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const initVal = {
    ...itemEdit,
    employee_first_name: itemEdit ? itemEdit.employee_first_name : "",
    employee_middle_name: itemEdit ? itemEdit.employee_middle_name : "",
    employee_last_name: itemEdit ? itemEdit.employee_last_name : "",
    employee_email: itemEdit ? itemEdit.employee_email : "",
    employee_first_name_old: itemEdit ? itemEdit.employee_first_name : "",
  };

  const yupSchema = Yup.object({
    employee_first_name: Yup.string().trim().required("required."),
    employee_middle_name: Yup.string().trim().required("required."),
    employee_last_name: Yup.string().trim().required("required."),
    employee_email: Yup.string()
      .trim()
      .email("Invalid email.")
      .required("required."),
  });

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  React.useEffect(() => {
    dispatch(setError(false));
  }, [dispatch]);

  return (
    <ModalWrapperSide
      handleClose={handleClose}
      className="transition-all ease-in-out transform duration-200"
    >
      <div className="modal-header relative mb-4">
        <h3 className="text-dark text-sm">
          {itemEdit ? "Update" : "Add"} Employee
          <button
            type="button"
            className="absolute top-0 right-4"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
        </h3>
      </div>

      <div className="modal-body">
        <Formik
          initialValues={initVal}
          validationSchema={yupSchema}
          onSubmit={async (values) => {
            mutation.mutate(values);
          }}
        >
          {(props) => (
            <Form className="h-full">
              <div className="modal-form-container">
                <div className="modal-container">
                  <div className="relative mb-6">
                    <InputText
                      name="employee_first_name"
                      label="First Name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mt-5 mb-6">
                    <InputText
                      name="employee_middle_name"
                      label="Middle Name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mt-5 mb-6">
                    <InputText
                      name="employee_last_name"
                      label="Last Name"
                      type="text"
                      disabled={mutation.isPending}
                    />
                  </div>

                  <div className="relative mt-5 mb-6">
                    <InputText
                      name="employee_email"
                      label="Email"
                      type="email"
                      disabled={mutation.isPending}
                    />
                  </div>

                  {store.error && <MessageError />}
                </div>

                <div className="modal-action">
                  <button
                    className="btn-modal-submit"
                    type="submit"
                    disabled={mutation.isPending || !props.dirty}
                  >
                    {mutation.isPending ? (
                      <ButtonSpinner />
                    ) : itemEdit ? (
                      "Save"
                    ) : (
                      "Add"
                    )}
                  </button>

                  <button
                    type="reset"
                    className="btn-modal-cancel"
                    onClick={handleClose}
                    disabled={mutation.isPending}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalWrapperSide>
  );
};

export default ModalAddEmployees;
