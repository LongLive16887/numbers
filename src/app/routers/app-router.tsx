import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";

const HomePage = lazy(() => import("../../pages/HomePage"));
const ResultPage = lazy(() => import("../../pages/ResultPage"));
const MyFactsPage = lazy(() => import("../../pages/MyFactsPage"));


export const AppRouter = () => {
  const routerConfig = createBrowserRouter([
    {
      path: "/",
      element:
        <HomePage />
    },
    {
      path: "/result",
      element:
        <ResultPage />
    },
    {
      path: "/my-facts",
      element:
        <MyFactsPage />
    }
  ]);

  return <RouterProvider router={routerConfig} />;
};
