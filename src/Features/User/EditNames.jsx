import { updateUser } from "./userSlice";
import YupForm from "../../Reusable components/YupForm";
import { updateProfile } from "../../Services/userAPIs";
import { updateProfileSchema } from "../../utils/Schemas";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function EditNames() {
  const dispatch = useDispatch();
  const userToken = useSelector((store) => store.user).token;
  const { t, i18n } = useTranslation();

  const schema = updateProfileSchema;

  async function editProfileFn(data) {
    const loading = toast.loading("Loading ...");
    try {
      const res = await updateProfile(data, userToken);
      if (res.message === "Update done") {
        toast.dismiss(loading);
        const { firstName, lastName, userName } = res.user_Details;
        dispatch(updateUser(firstName, lastName, userName));
        toast.success("Profile has been updated successfully !!");
      }
    } catch (error) {
      toast.dismiss(loading);
      toast.error(error.message);
      console.log(error);
    }
  }

  const fieldsArr = [
    { field: "firstName", label: `${t("First Name")}` },
    { field: "lastName", label: `${t("Last Name")}` },
  ];
  return (
    <div className="mt-4 flex flex-col justify-center text-xs sm:text-base">
      <div className="my-auto rounded-md bg-white bg-opacity-90 px-9 py-9 opacity-80 backdrop-blur-xl dark:bg-opacity-30 lg:py-10">
        <YupForm
          fields={fieldsArr}
          purpose={`${t("Update Names")}`}
          mySchema={schema}
          submitFunction={editProfileFn}
        />
      </div>
    </div>
  );
}

export default EditNames;
