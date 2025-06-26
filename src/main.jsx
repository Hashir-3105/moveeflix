import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./redux-toolkit/store";
import { Provider } from "react-redux";
import { ClerkProvider, SignUp } from "@clerk/clerk-react";
import MovieDetails from "./Components/MoviesInterfaceCmpnts/MovieDetails.jsx";
import MoviesList from "./Components/MoviesInterfaceCmpnts/MoviesList";
import SignInForm from "./Components/auth/SignInForm";
import PrivateRoute from "./Components/auth/PrivateRoute";
import HistorySave from "./Components/HistorySave";
import Bookings from "./Components/Bookings";
import Home from "./Components/LandingPage/Home";
import SignUpPage from "./Components/auth/Sign-up/SignUpPage";
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
