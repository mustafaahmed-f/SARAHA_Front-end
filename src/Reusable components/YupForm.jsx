import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../utils/Schemas";
import { useForm } from "react-hook-form";
import YupInputField from "./YupInputField";
import { Link } from "react-router-dom";
import Button from "./Button";
import PropTypes from "prop-types";

YupForm.propTypes = {
  mySchema: PropTypes.object,
  purpose: PropTypes.string,
  extraField: PropTypes.string,
  extraLink: PropTypes.string,
  fields: PropTypes.array,
};

function YupForm({
  mySchema,
  fields,
  purpose,
  extraField,
  extraLink,
  submitFunction,
}) {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(mySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
  });

  const handleSubmitFn = (data) => {
    if (purpose === "Sign up") {
      unregister("rePassword");
    }
    if (purpose === "Update Profile") {
      unregister("isOptional");
    }
    submitFunction(data);
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitFn)}>
      {purpose === "Update Profile" && (
        <input
          name="isOptional"
          {...register("isOptional")}
          value={true}
          hidden
        />
      )}
      {fields.map((element, index) => (
        <YupInputField
          errors={errors}
          field={element["field"]}
          register={register}
          label={element["label"]}
          key={index}
        />
      ))}

      {extraField && (
        <div className="my-4 flex w-full justify-end">
          <p className="cursor-pointer hover:text-blue-500 dark:hover:text-blue-200">
            <Link to={extraLink}>{extraField}</Link>
          </p>
        </div>
      )}
      <div className="mt-4 w-full">
        <Button>{purpose}</Button>
      </div>
    </form>
  );
}

export default YupForm;
