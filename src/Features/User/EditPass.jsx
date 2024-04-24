import YupForm from "../../Reusable components/YupForm";
import { updatePassword } from "../../Services/userAPIs";
import { updatePasswordSchema } from "../../utils/Schemas";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function EditPass() {
  const dispatch = useDispatch();
  const userToken = useSelector((store) => store.user).token;
  const schema = updatePasswordSchema;

  async function editPassFn(data) {
    const loading = toast.loading("Loading ...");
    try {
      const res = await updatePassword(data, userToken);
      if (res.message === "Password has been update Successfully !!") {
        toast.dismiss(loading);
        toast.success("Password has been update Successfully !!");
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error(error.message);
      console.log(error);
    }
  }

  const fieldsArr = [
    { field: "password", label: "Password" },
    { field: "rePassword", label: "Re-Password" },
  ];
  return (
    <div className="flex flex-col justify-center mt-4 text-xs sm:text-base">
      <div className="my-auto bg-white rounded-md bg-opacity-90 px-9 py-9 opacity-80 backdrop-blur-xl dark:bg-opacity-30 lg:py-10">
        <YupForm
          fields={fieldsArr}
          purpose="Update Password"
          mySchema={schema}
          submitFunction={editPassFn}
        />
      </div>
    </div>
  );
}

export default EditPass;
