import { Link } from "react-router-dom";
import NavigationButton from "../Reusable components/NavigationButton";

function Home() {
  return (
    <div className="flex justify-center py-10 align-middle">
      <div className="text-center text-2xl font-semibold dark:text-slate-50">
        <h3>Want to send and receive private messages ?</h3>
        <br />
        <h2 className="text-4xl font-bold">Join SARAHA now !!</h2>
        <div className="grid grid-rows-[auto_auto] py-7">
          <NavigationButton to={"/login"} innerText={"Log in"} />

          <NavigationButton to={"/signup"} innerText={"Sign up"} />
        </div>
      </div>
    </div>
  );
}

export default Home;
