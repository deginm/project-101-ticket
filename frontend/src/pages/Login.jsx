import { useState, Fragment, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isError, isSuccess, message , isLoading } = useSelector((state) => state.auth)
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset())
    }, [isSuccess, navigate, dispatch, user, isError, message])

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData
    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            toast.error('email and passwrod required');
            return
        }
        const userInfo = { email, password }
        dispatch(login(userInfo))
    }
    if(isLoading) return <Loader />
    return (
        <Fragment>
            <section className='heading'>
                <h1><FaSignInAlt /> Sign In</h1>
                <p>Please sign in account</p>
            </section>
            <section className='form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input type="text"
                            className='form-control'
                            id='email'
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input type="password"
                            className='form-control'
                            id='password'
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className='btn btn-block'>Login</button>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default Login