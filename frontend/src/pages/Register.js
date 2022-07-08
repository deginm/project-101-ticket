import { useState, Fragment } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
function Register() {
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
        
    }

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