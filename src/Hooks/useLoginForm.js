import { useRef, useState } from "react";
import { validateEmail, validatePassword } from "../utils/inputValidations";

export function useLoginForm() {
  const myEmailInputElement = useRef();
  const myPasswordInputElement = useRef();
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  /*
    // A custom hook for validation of input values of a login form .. Validation is done without any third-party libraries
  */

  function changeEmail() {
    if (
      !validateEmail(myEmailInputElement.current.value) &&
      myEmailInputElement.current.value
    ) {
      setEmailErr("Please enter a valid email : example@example.com");
    } else if (
      myEmailInputElement.current.value &&
      validateEmail(myEmailInputElement.current.value)
    ) {
      setEmailErr("");
    } else if (
      !myEmailInputElement.current.value &&
      myEmailInputElement.current === document.activeElement
    ) {
      setEmailErr("Field is required !");
    }
  }

  function changePassword() {
    if (
      !validatePassword(myPasswordInputElement.current.value) &&
      myPasswordInputElement.current.value
    ) {
      setPasswordErr(
        "Password should start with capital character and contains at least number with min. length 8",
      );
    } else if (
      myPasswordInputElement.current.value &&
      validatePassword(myPasswordInputElement.current.value)
    ) {
      setPasswordErr("");
    } else if (
      !myPasswordInputElement.current.value &&
      myPasswordInputElement.current === document.activeElement
    ) {
      setPasswordErr("Field is required !");
    }
  }

  return {
    myEmailInputElement,
    myPasswordInputElement,
    emailErr,
    passwordErr,
    changeEmail,
    changePassword,
  };
}
