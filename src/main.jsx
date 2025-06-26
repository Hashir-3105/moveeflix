import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./redux-toolkit/store";
import { Provider } from "react-redux";
import { ClerkProvider, SignUp } from "@clerk/clerk-react";
import MovieDetails from "./components/MoviesInterfaceCmpnts/MovieDetails.jsx";
import MoviesList from "./components/MoviesInterfaceCmpnts/MoviesList";
import SignInForm from "./components/auth/SignInForm";
import PrivateRoute from "./components/auth/PrivateRoute";
import HistorySave from "./components/HistorySave";
import Bookings from "./components/Bookings";
import Home from "./components/LandingPage/Home";
import SignUpPage from "./components/auth/Sign-up/SignUpPage";
import App from "./App";
// import ResetPassword from './Components/auth/reset-password/ResetPassword'
// import SignUpForm from './Components/auth/SignUpForm'
// import SignUp from './Clerk/SignUpForm'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log("Clerk Key:", import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "MoviesList",
        element: (
          <PrivateRoute>
            <MoviesList />
          </PrivateRoute>
        ),
      },
      {
        path: "movie/:id",
        element: (
          <PrivateRoute>
            <MovieDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "HistoryPage",
        element: (
          <PrivateRoute>
            <HistorySave />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "BookingsPage",
    element: (
      <PrivateRoute>
        <Bookings />
      </PrivateRoute>
    ),
  },
  {
    path: "sign-in",
    element: <SignInForm />,
  },
  // {
  //   path: 'reset-password',
  //   element: <ResetPassword />
  // },
  {
    path: "sign-up",
    element: <SignUpPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Provider store={store}>
      {/* <CursorFollower /> */}
      <RouterProvider router={router} />
    </Provider>
  </ClerkProvider>
);
