import toast from "react-hot-toast";
import { signUpSchema } from "../../utils/Schemas";
import YupForm from "../../Reusable components/YupForm";
import { signUp } from "../../Services/authAPIs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

function SignUp() {
  const schema = signUpSchema;
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  // const { unregister } = useForm();

  async function signUpFunc(data) {
    // unregister("rePassword");
    const loading = toast.loading("Creating account");
    const res = await signUp(data);
    if (res.message === "Done") {
      toast.dismiss(loading);
      toast.success("Account has been created successfully !");
      navigate("/login");
    }
  }

  const fieldsArr = [
    { field: "firstName", label: "First Name" },
    { field: "lastName", label: "Last Name" },
    { field: "userName", label: "User name" },
    { field: "email", label: "Email" },
    { field: "password", label: "Password" },
    { field: "rePassword", label: "Re-Password" },
  ];
  return (
    <div className="flex flex-col justify-center">
      <div className="my-auto rounded-md bg-white bg-opacity-90 px-9 py-9 opacity-80 backdrop-blur-xl dark:bg-opacity-30 lg:py-10">
        <h2 className="mb-10 text-3xl dark:text-slate-300 lg:text-4xl">
          Create new account
        </h2>
        <YupForm
          fields={fieldsArr}
          purpose="Sign up"
          mySchema={schema}
          extraField="Already have account ?"
          extraLink="/login"
          submitFunction={signUpFunc}
        />
      </div>
    </div>
  );
}

export default SignUp;
