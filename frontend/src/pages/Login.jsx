import { useState } from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
    //Create default state for the form input fields
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    //Destructure the form data to allow access through variables
    //instead of using the dot operator
    const { email, password } = formData

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    function onSubmit(e) {
        e.preventDefault()
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Please log in for support</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
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
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
