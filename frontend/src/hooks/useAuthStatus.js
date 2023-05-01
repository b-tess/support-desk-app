import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    //Access the global state that contains the user's logged in status i.e presence of a value in the local storage user key
    const { user } = useSelector((state) => state.auth)

    //This useEffect should run everytime the user's logged in status changes
    useEffect(() => {
        //Check if a user is logged in
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }

        //Once checking the user is done, set the loading status to false
        setLoading(false)
    }, [user])

    //Make the two local states available wherever the function is called
    return { loggedIn, loading }
}
