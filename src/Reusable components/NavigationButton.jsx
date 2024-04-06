import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavigationButton({ to, innerText }) {
  return (
    <Link
      to={to}
      className="mb-10 block rounded-full bg-teal-400 px-5 py-1 hover:bg-teal-600 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
    >
      {innerText}
    </Link>
  );
}

NavigationButton.propTypes = {
  to: PropTypes.string,
  tailWind: PropTypes.string,
  innerText: PropTypes.string,
};

export default NavigationButton;
