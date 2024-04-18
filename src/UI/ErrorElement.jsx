import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ErrorUI from "./ErrorUI";

function ErrorElement() {
  let error = useRouteError();
  //   console.log(error.message);
  return (
    <div className="relative grid h-screen grid-rows-[auto_1fr_auto]">
      <ErrorUI errMsg={error.message} />
    </div>
  );
}

export default ErrorElement;
