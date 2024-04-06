import { useEffect } from "react";
import { getUser } from "../Features/User/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthProtectedRoute({ children }) {
  const user = useSelector(getUser);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!user.isAuth) navigate("/login");
    },
    [user.isAuth],
  );

  return user.isAuth ? children : null;
}

export default AuthProtectedRoute;
