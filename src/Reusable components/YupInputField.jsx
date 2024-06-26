import { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

YupInputField.propTypes = {
  errors: PropTypes.object,
  field: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
};

function YupInputField({ errors, field, register, label }) {
  const [showPass, setShowPass] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <div className="mt-8 flex w-full flex-col justify-between gap-2 align-middle md:flex-row">
      <label htmlFor={`${field}`}>{label} : </label>
      <div className="flex flex-col md:w-4/5">
        <input
          onPaste={(e) => {
            (field === "password" ||
              field === "rePassword" ||
              field === "كلمة المرور" ||
              field === "تأكيد كلمة المرور") &&
              e.preventDefault();
          }}
          id={`${field}`}
          {...register(`${field}`)}
          type={
            (field === "password" ||
              field === "rePassword" ||
              field === "كلمة المرور" ||
              field === "تأكيد كلمة المرور") &&
            !showPass
              ? "password"
              : "text"
          }
          placeholder={`${t("enter your")} ${label} ...`}
          className={`rounded-full bg-gray-300 px-4 py-1 ring placeholder:text-xs placeholder:sm:text-base ${errors[`${field}`] ? `ring-red-400 dark:ring-red-500` : `ring-transparent`} focus:outline-0 dark:bg-gray-700 dark:text-slate-100 `}
        />
        {(field === "password" || field === "كلمة المرور") && (
          <div className="flex items-center gap-1 px-2 py-1">
            <input
              type="checkbox"
              onChange={(e) => setShowPass(e.target.checked)}
            />
            <span>{t("Show password")}</span>
          </div>
        )}
        <p className="mb-0 mt-1 text-red-600 dark:text-red-950">
          {errors[`${field}`] && errors[`${field}`]?.message}
        </p>
      </div>
    </div>
  );
}

export default YupInputField;
