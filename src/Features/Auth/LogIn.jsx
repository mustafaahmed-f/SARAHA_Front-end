import Button from "../../Reusable components/Button";
import InputField from "../../Reusable components/inputField";
import { Form, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginForm } from "../../Hooks/useLoginForm.js";
import { logIn } from "../../Services/authAPIs.js";
import { Login } from "../User/userSlice.js";
import store from "../../store.js";
import { redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

const errors = {
  email: "",
  password: "",
};

function LogIn() {
  const {
    myEmailInputElement,
    myPasswordInputElement,
    emailErr,
    passwordErr,
    changeEmail,
    changePassword,
  } = useLoginForm();
  const { t, i18n } = useTranslation();

  // emailInputVal = myEmailInputElement.current.value;
  // passwordInputVal = myPasswordInputElement.current.value;

  return (
    <div className="flex flex-col justify-center">
      <div className="my-auto rounded-md bg-white bg-opacity-90 px-9 py-9 opacity-80 backdrop-blur-xl dark:bg-opacity-30 lg:py-10">
        <h2 className="mb-10 text-3xl dark:text-slate-300 lg:text-4xl">
          Member Login
        </h2>
        <Form method="POST">
          <InputField
            placeholder={"enter your email ..."}
            myRef={myEmailInputElement}
            onChange={changeEmail}
            errMsg={emailErr}
            myType={"text"}
            myName={"email"}
          />

          <InputField
            placeholder={"enter your password ..."}
            myRef={myPasswordInputElement}
            onChange={changePassword}
            errMsg={passwordErr}
            myType={"password"}
            myName={"password"}
          />
          <div className="my-4 flex w-full justify-end">
            <p className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-200">
              <Link>Forgot password ?</Link>
            </p>
          </div>
          <div className="w-full">
            <Button>Log in</Button>
          </div>
        </Form>

        <div className="mt-4 flex w-full justify-center">
          <p className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-200">
            <Link to="/signup">Create account ?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }) {
  // const dispatch = useDispatch();
  try {
    const data = await request.formData();
    const dataObject = Object.fromEntries(data);
    if (
      (!"email") in dataObject ||
      (!"password") in dataObject ||
      !dataObject.email ||
      !dataObject.password
    ) {
      return null;
    }
    const toastLoading = toast.loading("Loading ...");
    const res = await logIn(dataObject);
    if (res.errMsg) {
      toast.dismiss(toastLoading);

      if (res.errMsg === "Validation Error") {
        toast.error(res.errMsg);
        res.Errors[0].map((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error(res.errMsg);
      }
      return null;
    }
    toast.dismiss(toastLoading);
    toast.success("Logged in successfully");
    localStorage.setItem("sarahaLoginToken", res.token);
    store.dispatch(
      Login(
        res.user_Details.userName,
        res.user_Details.firstName,
        res.user_Details.lastName,
        res.token,
      ),
    );

    return redirect("/messages");
    // return null;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export default LogIn;
