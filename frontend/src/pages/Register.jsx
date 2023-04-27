import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'

//useSelector gives access to the properties in the global state
//useDispatch is used to dispatch/send actions to the reducer i.e. authSlice.reducer/authReducer

function Register() {
    //Create default state for the form input fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    //Destructure the form data to allow access through variables
    //instead of using the dot operator
    const { name, email, password, password2 } = formData

    //Initialize the useDispatch hook
    const dispatch = useDispatch()

    //Destructure a specific global state that's defined in the reducer in the store
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    )

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    function onSubmit(e) {
        e.preventDefault()

        //Check that both passwords match & pass the user input into the global state
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
        }
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            value={name}
                            onChange={onChange}
                            placeholder='Enter your name'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Enter your password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password2'
                            value={password2}
                            onChange={onChange}
                            placeholder='Confirm your password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register
