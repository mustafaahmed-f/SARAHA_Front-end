import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ErrorUI from "./ErrorUI";

function ErrorElement() {
  let error = useRouteError();
  //   console.log(error.message);
  return (
    <div className="relative grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <ErrorUI errMsg={error.message} />
      <Footer />
    </div>
  );
}

export default ErrorElement;
