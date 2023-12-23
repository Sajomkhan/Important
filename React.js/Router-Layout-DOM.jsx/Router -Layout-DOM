import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menubar from './components/Menubar';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Project from "./pages/project/Project";
import Introduction from "./pages/introduction/Introduction";
import About from "./pages/about/About";
import Tech from "./pages/tech/Tech";
import Experience from "./pages/experience/Experience";
import Education from "./pages/education/Education";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ProjectEditForm from "./pages/project/ProjectEditForm";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";

const queryClient = new QueryClient()

function App() {

  const Layout = () => {
    return (
      <div className="">
        <Navbar />
        <div className="flex bg-gray-800 min-h-[calc(100vh-56px)] text-gray-100 w-full mt-[56px]">
          <div className="">
            <Menubar />
          </div>
          <div className="py-8 px-12 ml-44 lg:ml-[300px] w-full">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
      </div>
    );
  };
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/project",
          element: <Project />,
        },
        {
          path: "/introduction",
          element: <Introduction />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/tech",
          element: <Tech />,
        },
        {
          path: "/education",
          element: <Education />,
        },
        {
          path: "/experience",
          element: <Experience />,
        },

        {
          path: `/project-edit/:id`,
          element: <ProjectEditForm />,
        },

        {
          path: `/*`,
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
