import {createBrowserRouter} from "react-router-dom";
import App from "./screens/App.tsx";
import ModelOutputImage from "./screens/ModelOutputImage.tsx";
import ImageModification from "./screens/ImageModification.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/model-output",
    children: [
      {
        path: ":modelOutputImageId",
        element: <ModelOutputImage/>
      }
    ]
  },
  {
    path: "/modification",
    children: [
      {
        path: ":modelOutputImageModificationId",
        element: <ImageModification/>
      }
    ]
  }
]);

export default router;
