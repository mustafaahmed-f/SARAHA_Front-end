import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import Home from "./UI/Home";
import Messages from "./Features/Messages/Messages";
import SendMessage from "./Features/Messages/SendMessage";
import EditProfile from "./Features/User/EditProfile";
import LogIn from "./Features/Auth/LogIn";
import SignUp from "./Features/Auth/SignUp";
import { action as loginAction } from "./Features/Auth/LogIn";
import { useDispatch } from "react-redux";
import UnAuthProtectedRoute from "./UI/UnAuthProtectedRoute";
import AuthProtectedRoute from "./UI/AuthProtectedRoute";
import { loader as layoutLoader } from "./UI/AppLayout";
import ForgotPassword from "./Features/Auth/ForgotPassword";
import PageNotFound from "./UI/PageNotFound";
import EditNames from "./UI/EditNames";
import EditPass from "./UI/EditPass";
import ErrorElement from "./UI/ErrorElement";
import SentMessages from "./UI/SentMessages";
import ReceivedMessages from "./UI/ReceivedMessages";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    loader: layoutLoader,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: (
          <UnAuthProtectedRoute>
            <Home />
          </UnAuthProtectedRoute>
        ),
      },
      {
        path: "/forgotPass",
        element: (
          <UnAuthProtectedRoute>
            <ForgotPassword />
          </UnAuthProtectedRoute>
        ),
      },
      {
        path: "/messages",
        element: (
          <AuthProtectedRoute>
            <Messages />
          </AuthProtectedRoute>
        ),
        children: [
          {
            path: "sentMessages",
            element: <SentMessages />,
          },
          {
            path: "receivedMessages",
            element: <ReceivedMessages />,
          },
        ],
      },
      {
        path: "/editProfile",
        element: (
          <AuthProtectedRoute>
            <EditProfile />
          </AuthProtectedRoute>
        ),
        children: [
          {
            path: "editNames",
            element: <EditNames />,
          },
          {
            path: "editPass",
            element: <EditPass />,
          },
        ],
      },
      {
        path: "/login",
        element: (
          <UnAuthProtectedRoute>
            <LogIn />
          </UnAuthProtectedRoute>
        ),
        action: loginAction,
      },
      {
        path: "/signup",
        element: (
          <UnAuthProtectedRoute>
            <SignUp />
          </UnAuthProtectedRoute>
        ),
      },
      {
        path: "/sendMsg/:userName",
        element: <SendMessage />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
