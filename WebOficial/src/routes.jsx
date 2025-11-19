import { createBrowserRouter } from "react-router";

import Home from "./pages/Home";
import Descricao from "./pages/Descricao";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/descricao/:id",
        element: <Descricao />,
      },
    ],
  },
]);

export default router;