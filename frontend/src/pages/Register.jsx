import { useState, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Loader from '../components/Loader';

function Register() {
    // globle state (redux)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isSuccess, isError,isLoading, message } = useSelector((state) => state.authReducer);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset())
    }, [navigate, dispatch, isError, message, user, isSuccess])

    // local state for register form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPwd: '',
    })
    const { name, email, password, confirmPwd } = formData

    const handleChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPwd) {
            toast.error('Pasword do not match');
            return
        }
        const userInfo = { name, email, password };
        dispatch(register(userInfo))
    }
    if(isLoading) return <Loader />
    return (
        <Fragment>
            <section className='heading'>
                <h1><FaUser /> Register</h1>
                <p>Please creacte an account</p>
            </section>
            <section className='form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input type="text"
                            className='form-control'
                            id='name'
                            name="name"
                            value={name} onChange={handleChange}
                            placeholder="Enter Name"
                            required
                        />
                    </div>
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
                    <div className='form-group'>
                        <input type="password"
                            className='form-control'
                            id='confirmPwd'
                            name="confirmPwd"
                            value={confirmPwd}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </Fragment>
    )
}

export default Register