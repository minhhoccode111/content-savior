import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      Element: <App />,
    },
  ]);

  return <RouterProvider router={router} />;
}
