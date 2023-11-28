import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginForm from "./LoginForm.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register.jsx";
import Authroute from "./Authroute.jsx";
import Profile from "./Profile.jsx";
import { fetchUser } from "./Service.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/profile",
    element: <Authroute />,
    loader: fetchUser,
    children: [
      {
        path: "",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
