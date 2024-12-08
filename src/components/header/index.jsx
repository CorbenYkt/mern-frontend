import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { logout, selectIsAuth, selectUserData } from '../../redux/slices/auth';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const userData = useSelector(selectUserData);

    const onClickLogout = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    };

    return (
        <header className="p-2">
            <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
                <h1 className="text-xl font-bold"><Link to="/">MERN Blog</Link></h1>
                <div className="ml-auto flex space-x-2">
                    {isAuth ? (
                        <>
                            <span className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Logged as: {userData?.fullName || "User"}
                            </span>

                            <Link to="/add-post">
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Write a post</button></Link>
                            <button onClick={onClickLogout} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Log out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log In</button>
                            </Link>
                            <Link to="/register">
                                <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create Account</button>
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </header>
    );
};
