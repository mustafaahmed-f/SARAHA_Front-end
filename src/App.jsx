import { lazy, Suspense } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import ErrorElement from "./UI/ErrorElement";
import UnAuthProtectedRoute from "./UI/UnAuthProtectedRoute";
import AuthProtectedRoute from "./UI/AuthProtectedRoute";

const Messages = lazy(() => import("./Features/Messages/Messages"));
const Home = lazy(() => import("./UI/Home"));
const LazySendMessage = lazy(() => import("./Features/Messages/SendMessage"));
const EditProfile = lazy(() => import("./Features/User/EditProfile"));
const LogIn = lazy(() => import("./Features/Auth/LogIn"));
const SignUp = lazy(() => import("./Features/Auth/SignUp"));

const PageNotFound = lazy(() => import("./UI/PageNotFound"));
const LazyEditNames = lazy(() => import("./Features/User/EditNames"));
const EditPass = lazy(() => import("./Features/User/EditPass"));
const FinalMessages = lazy(() => import("./Features/Messages/FinalMessages"));

import { receivedLoader } from "./Features/Messages/FinalMessages";
import { sentLoader } from "./Features/Messages/FinalMessages";

import { action as loginAction } from "./Features/Auth/LogIn";
import { loader as layoutLoader } from "./UI/AppLayout";
import { loader as sendMsgLoader } from "./Features/Messages/SendMessage";

import Loader from "./UI/Loader";

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
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          </UnAuthProtectedRoute>
        ),
      },

      {
        path: "/messages",
        element: (
          <AuthProtectedRoute>
            <Suspense fallback={<Loader />}>
              <Messages />
            </Suspense>
          </AuthProtectedRoute>
        ),
        children: [
          {
            path: "sentMessages/:token",
            element: (
              <Suspense fallback={<Loader />}>
                <FinalMessages received={false} />
              </Suspense>
            ),
            loader: sentLoader,
          },
          {
            path: "receivedMessages/:token",
            element: (
              <Suspense fallback={<Loader />}>
                <FinalMessages received={true} />
              </Suspense>
            ),
            loader: receivedLoader,
          },
        ],
      },
      {
        path: "/editProfile",
        element: (
          <AuthProtectedRoute>
            <Suspense fallback={<Loader />}>
              <EditProfile />
            </Suspense>
          </AuthProtectedRoute>
        ),
        children: [
          {
            path: "editNames",
            element: (
              <Suspense fallback={<Loader />}>
                <LazyEditNames />
              </Suspense>
            ),
          },
          {
            path: "editPass",
            element: (
              <Suspense fallback={<Loader />}>
                <EditPass />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: (
          <UnAuthProtectedRoute>
            <Suspense fallback={<Loader />}>
              <LogIn />
            </Suspense>
          </UnAuthProtectedRoute>
        ),
        action: loginAction,
      },
      {
        path: "/signup",
        element: (
          <UnAuthProtectedRoute>
            <Suspense fallback={<Loader />}>
              <SignUp />
            </Suspense>
          </UnAuthProtectedRoute>
        ),
      },
      {
        path: "/sendMsg/:userName",
        element: (
          <Suspense fallback={<Loader />}>
            <LazySendMessage />
          </Suspense>
        ),
        loader: sendMsgLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <PageNotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
