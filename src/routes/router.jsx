import { createBrowserRouter } from "react-router-dom";
import EditPost from "../pages/EditPost";

const router = createBrowserRouter([
  {
    path:"/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts", element: <PostList /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "posts/:id/edit", element: <EditPost /> },
    ],
  },
]);

export default router;