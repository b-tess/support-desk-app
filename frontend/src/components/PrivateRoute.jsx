import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus.js'
import Spinner from './Spinner.jsx'

function PrivateRoute() {
    //Destructure the state from the useAuthStatus hook
    const { loggedIn, loading } = useAuthStatus()

    if (loading) {
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute
