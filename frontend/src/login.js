import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserAction } from './store/actions/authActions';
import './styles/register.css'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      const userData = {
        email: email,
        password: password,
    };

    try {
        dispatch(loginUserAction(userData));
        // navigate to the home page
        navigate('/home');

    } catch (error) {
        console.log("An error occured: ", error);
    }

    };

    return (
        <div className='auth-page'>
            <h1 className='title'>VEXED</h1>
        <div className='login-box'>
            <h1>Login Page</h1>
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
            <button onClick={handleLogin}>Login</button>
        </div>
        </div>
    )
}

export default Login;