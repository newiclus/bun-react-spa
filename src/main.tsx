import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";

import "./index.css";
import UserList from "@/modules/user/pages/list";
import UserCreate from "@/modules/user/pages/create";
import ROUTES from "@/config/routes";
// Redux
import { store } from "@/data/store";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <UserList />,
  },
  {
    path: ROUTES.CREATE_USER,
    element: <UserCreate />,
  },
  {
    path: ROUTES.EDIT_USER,
    element: <UserCreate isEdit />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <main className="text-foreground container mx-auto">
          <RouterProvider router={router} />
        </main>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
