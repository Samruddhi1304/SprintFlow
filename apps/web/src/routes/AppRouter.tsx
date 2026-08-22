import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import Welcome from "../pages/Welcome/Welcome";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);