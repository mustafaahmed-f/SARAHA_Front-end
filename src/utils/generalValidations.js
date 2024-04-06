import * as yup from "yup";

const generalValidations = {
  userName: yup
    .string()
    .min(3, "Min. length 3")
    .max(20, "Max. length 20")
    .matches(
      /^[a-zA-Z0-9]{3,20}$/,
      "userName should consist of letters and numbers only",
    ),
  firstName: yup
    .string()
    .min(3, "Min. length 3")
    .max(20, "Max. length 20")
    .matches(/^[a-zA-Z]{3,20}$/, "firstName should contain letters only"),

  lastName: yup
    .string()
    .min(3, "Min. length 3")
    .max(20, "Max. length 20")
    .matches(/^[a-zA-Z]{3,20}$/, "lastName should contain letters only"),
  password: yup
    .string()

    .min(8, "Min. length of password is 8")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password should contain at least number and capital letter with min. length 8",
    ),
  rePassword: yup
    .string()

    .oneOf([yup.ref("password")], "Password should match"),
};

export default generalValidations;
