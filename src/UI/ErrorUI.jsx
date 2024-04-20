import { useNavigate } from "react-router-dom";

function ErrorUI({ errMsg }) {
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("sarahaLoginToken");
    navigate("/login");
  }
  return (
    <div className="flex flex-col gap-3 py-8 md:gap-6">
      <p className="text-center text-red-600 dark:text-red-400">{errMsg}</p>
      {errMsg ===
        "Error: Token is not related to user or user is not found !!" && (
        <p className="text-center">
          <span
            className="cursor-pointer text-blue-600 dark:text-blue-300"
            onClick={handleLogOut}
          >
            Log in
          </span>{" "}
          again to continue
        </p>
      )}
      <div className="flex w-full justify-center">
        <img
          alt="Error"
          src="../../public/6029646.jpg"
          className="w-[90%] sm:w-[40%]"
        />
      </div>
    </div>
  );
}

export default ErrorUI;
