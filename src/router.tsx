import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "./App";
import CalendarPage from "./views/CalendarPage";
import DashboardPage from "./views/DashboardPage";
import WatchlistPage from "./views/WatchlistPage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: "calendar",
        element: <CalendarPage />
      },
      {
        path: "watchlist",
        element: <WatchlistPage />
      }
    ]
  }
];

// Hash router enables file:// support for portable bundles without installation.
export const router = createHashRouter(routes);
export const browserRouter = createBrowserRouter(routes);
