import { useState } from "react";
import PropTypes from "prop-types";

YupInputField.propTypes = {
  errors: PropTypes.object,
  field: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.func,
};

function YupInputField({ errors, field, register, label }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="mt-8 flex w-full flex-col justify-between gap-2 align-middle md:flex-row">
      <label htmlFor={`${field}`}>{label} : </label>
      <div className="flex flex-col md:w-4/5">
        <input
          onPaste={(e) => {
            (field === "password" || field === "rePassword") &&
              e.preventDefault();
          }}
          id={`${field}`}
          {...register(`${field}`)}
          type={
            (field === "password" || field === "rePassword") && !showPass
              ? "password"
              : "text"
          }
          placeholder={`enter your ${field} ...`}
          className={`rounded-full bg-gray-300 px-4 py-1 ring ${errors[`${field}`] ? `ring-red-400 dark:ring-red-500` : `ring-transparent`} focus:outline-0 dark:bg-gray-700 dark:text-slate-100 `}
        />
        {field === "password" && (
          <div className="flex gap-1 px-2 py-1 align-middle">
            <input
              type="checkbox"
              onChange={(e) => setShowPass(e.target.checked)}
            />
            <span>Show password</span>
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
