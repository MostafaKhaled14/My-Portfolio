import "./App.css";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Portfolio from "./Components/Portfolio/Portfolio";
import Contact from "./Components/Contact/Contact";
import Blog from "./Components/Blog/Blog";
import Admin from "./Components/Admin/Admin";

const Routers = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "contact", element: <Contact /> },
      { path: "blog", element: <Blog /> },
      { path: "Admin", element: <Admin /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={Routers}></RouterProvider>
    </>
  );
}
