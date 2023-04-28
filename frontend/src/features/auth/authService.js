import axios from 'axios'

//This puts the functionality of Postman into the application i.e. making http requests
//Set the endpoint for registering a new user
const API_URL = '/api/users'
const LOGIN_URL = '/api/users/login'

//Register a new user in the backend
async function register(userData) {
    const response = await axios.post(API_URL, userData)

    //Check if a response containing the user data is present
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//Log a user in
async function login(userData) {
    const response = await axios.post(LOGIN_URL, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Log a user out
function logout() {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
}

export default authService
