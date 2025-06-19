// import { Routes, Router, Route, BrowserRouter } from 'react-router-dom'
// import './App.css'
// import MoviesList from './Components/LandingPage/MoviesList'
// import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
// import { ClerkProvider } from '@clerk/clerk-react'
// import SignInForm from './Components/auth/SignInForm';
// import MovieDetails from './Components/LandingPage/MovieDetails';
// import Bookings from './Components/Bookings';
// import HistorySave from './Components/HistorySave';

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// function App() {
//   return (
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//       <SignedOut>
//         <SignInForm routing="react" path="/sign-in" />
//       </SignedOut>
//       <SignedIn>
//         <Routes>
//           <Route path='/' element={<MoviesList />} />
//           <Route path='/movie/:id' element={<MovieDetails />} />
//           <Route path='/BookingsPage' element={<Bookings />} />
//           <Route path='/HistoryPage' element={<HistorySave />} />
//         </Routes>
//       </SignedIn>
//     </ClerkProvider>
//   )
// }

// export default App
