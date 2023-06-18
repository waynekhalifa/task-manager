import * as Yup from "yup";

export const resetSendValidation = Yup.object().shape({
  user: Yup.string().required("Email is required"),
});
