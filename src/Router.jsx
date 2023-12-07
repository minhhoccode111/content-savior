import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root.jsx";
import ErrorPage from "./routes/error-page.jsx";
import Index from "./routes/index.jsx";
import Content, {
  action as contentAction,
  loader as contentLoader,
} from "./routes/content.jsx";
import EditContent, { action as editAction } from "./routes/edit.jsx";
import { action as destroyAction } from "./routes/destroy.jsx";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      action: rootAction,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Index />,
            },
            {
              path: "contents/:contentId",
              element: <Content />,
              loader: contentLoader,
              action: contentAction,
            },
            {
              path: "contents/:contentId/edit",
              element: <EditContent />,
              loader: contentLoader,
              action: editAction,
            },
            {
              path: "contents/:contentsId/destroy",
              action: destroyAction,
              errorElement: <div>Oops! There was an error.</div>,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
