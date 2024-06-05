import {createBrowserRouter} from "react-router-dom";
import App from "./App.tsx";
import OriginalImage from "./OriginalImage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  }, {
    path: "/original",
    children: [
      {
        path: ":originalImageId",
        element: <OriginalImage/>
      },
      {
        index: true,
        element: <OriginalImage/>
      },
    ],
  }
]);

export default router;
