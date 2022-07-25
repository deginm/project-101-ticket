import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {logout , reset } from '../features/auth/authSlice'

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleClick = () => { 
        dispatch(logout());
        dispatch(reset());
        navigate('/')
    }

    return <header className='header'>
        <div className='logo'>
            <Link to='/'> Support Desk </Link>
        </div>
        {user ? <button className='btn' onClick={handleClick}>
                <FaSignOutAlt /> Logout
             </button> : <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser /> Register
                    </Link>
                </li>
            </ul>
        }
    </header>
}

export default Header