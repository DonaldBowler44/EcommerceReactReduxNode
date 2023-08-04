import React, { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { registerUserAction } from './store/actions/authActions';
import './styles/register.css'

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const userData = {
            username: username,
            email: email,
            password: password,
        };
        dispatch(registerUserAction(userData));
        navigate('/login');
    };

    return (
        <div className='auth-page'>
            <h1 className='title'>VEXED</h1>
        <div className='login-box'>
            <h1>Register Page</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>

            <p>
                Already have an account?{' '}
                <Link to="/login">Click here to log in</Link>
            </p>
        </div>
        </div>
    )
}

export default RegisterPage;