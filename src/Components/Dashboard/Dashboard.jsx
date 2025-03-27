import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate, Link } from 'react-router-dom';
import "./Dashboard.css";
import taskIcon from "../../assets/task_icon.png";
import listIcon from "../../assets/list_icon.png";
import boardIcon from "../../assets/board_icon.png";
import LogoutLogo from "../../assets/logout_icon.png";
import Listview from '../Listview/Listview';
import Boardview from '../Boardview/Boardview';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const photo = localStorage.getItem("photo");

        if (email) {
            setUser({ name, email, photo });
        } else {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <>
            <div className='dashboard'>
                <div className='header'>
                    <div className='headerIcon'>
                        <img src={taskIcon} alt='TaskIcon' />
                        <p>TaskBuddy</p>
                    </div>
                    <div className="buttonView">
                        <Link to="/dashboard/list-view">
                            <button className="btn1">
                                <span><img src={listIcon} alt="ListView" /></span>List
                            </button>
                        </Link>
                        <Link to="/dashboard/board-view">
                            <button className="btn1">
                                <span><img src={boardIcon} alt="BoardView" /></span>Board
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='users'>
                    {user ? (
                        <div className='userInfo'>
                            <img src={user.photo} alt='Avatar' className='avatar' />
                            <p>{user.name}</p>
                        </div>
                    ) : (
                        <p>Loading user info...</p>
                    )}
                    <div className='logout'>
                        <button onClick={handleLogout}>
                            <span><img src={LogoutLogo} alt='logout' /></span>Logout
                        </button>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Navigate to="list-view" />} />
                <Route path="list-view" element={<Listview />} />
                <Route path="board-view" element={<Boardview />} />
            </Routes>
        </>
    );
}

export default Dashboard;
