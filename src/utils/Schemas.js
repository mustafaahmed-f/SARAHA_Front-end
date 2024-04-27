import * as yup from "yup";
import generalValidations from "./generalValidations";

export const signUpSchema = yup
  .object({
    userName: generalValidations.userName.required("userName is required"),
    firstName: generalValidations.firstName.required("First name is required"),
    lastName: generalValidations.lastName.required("Last name is required"),
    password: generalValidations.password.required("Password is required"),
    rePassword: generalValidations.rePassword.required(
      "Re-Password is required",
    ),
    email: yup.string().required("Email is required").email(),
  })
  .required();

export const updateProfileSchema = yup.object().shape({
  isOptional: yup.boolean(), //// To make fields optional
  firstName: yup.string().when(["isOptional"], {
    is: (val) => val === true, //// Check if optinal is false >> Apply firstName validations, so it's required
    then: () => generalValidations.firstName,
    otherwise: () => yup.string().optional(),
  }),
  lastName: yup.string().when(["isOptional"], {
    is: (val) => val === true, //// Check if optinal is false >> Apply lastName validations, so it's required
    then: () => generalValidations.lastName,
    otherwise: () => yup.string().optional(),
  }),
});

export const updatePasswordSchema = yup
  .object({
    password: generalValidations.password.required("Password is required"),
    rePassword: generalValidations.rePassword.required(
      "Re-Password is required",
    ),
  })
  .required();
