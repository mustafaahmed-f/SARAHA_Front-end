import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { disableLink } from "../../utils/disableLink";
import { useTranslation } from "react-i18next";

function EditProfile() {
  const { t, i18n } = useTranslation();
  return (
    <div className="flex flex-col rounded-md bg-slate-50 p-4 dark:bg-slate-800">
      <h2 className="mb-6 text-center text-2xl dark:text-slate-300 lg:text-4xl">
        {t("Edit your Profile")}
      </h2>
      <div className="mb-6 flex justify-center">
        <img
          src="new_male.jpg"
          className="w-20 dark:brightness-75 dark:filter md:w-36"
        />
      </div>
      <div className="editNav mt-8 flex justify-center align-middle">
        <ul className="flex w-fit flex-nowrap gap-2 rounded-md bg-slate-300 p-1 px-1 text-xs dark:bg-slate-600 sm:text-base">
          <li>
            <NavLink
              className="rounded-md px-2 py-[1px] dark:text-slate-50"
              to="editNames"
              onClick={disableLink}
            >
              {t("Edit names")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="editPass"
              className="rounded-md px-2 py-[1px] dark:text-slate-50"
              onClick={disableLink}
            >
              {t("Edit password")}
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default EditProfile;
