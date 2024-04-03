import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CameraRecordPage from "./pages/CameraRecordPage";
import Home from "./pages/Home";
import ScreenRecordPage from "./pages/ScreenRecordPage";
import { Provider } from "react-redux";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/screen-recorder",
    element: <ScreenRecordPage />,
  },
  {
    path: "/webcam-recorder",
    element: <CameraRecordPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
