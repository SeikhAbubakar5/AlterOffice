import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/Firebase";
import task from "../../assets/task.png";
import Google from "../../assets/google.png";
import Circle from "../../assets/circles_bg.png";

function Login() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then((data) => {
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("name", data.user.displayName);
            localStorage.setItem("photo", data.user.photoURL);
            navigate('/dashboard');
        });
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setValue(storedEmail);
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div className='container'>
            <div className='leftSide'>
                <div className='Vector'>
                    <img src={task} alt='logo' />
                    <h3>TaskBuddy</h3>
                </div>
                <p>Streamline your workflow and track progress effortlessly with our all-in-one task management app.</p>
                <button onClick={signInWithGoogle} className='buttons'>
                    <span className='btn'><img src={Google} alt='BtnLogo' /><p>Continue with Google</p></span>
                </button>
            </div>
            <div className='rightSide'>
                <img src={Circle} alt='CircleImage' />
            </div>
        </div>
    );
}

export default Login;
