import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    const { isLoaded, isSignedIn } = useUser()

    if (!isLoaded) return null;

    return isSignedIn ? children : <Navigate to="/sign-in" replace />
}

export default PrivateRoute
