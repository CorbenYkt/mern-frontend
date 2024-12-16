import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useState } from 'react'

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [errorMessage, setErrorMessage] = useState(null);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: 'vool34@gmail.com',
      password: '123456'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const result = await dispatch(fetchAuth(values));
    if (!result.payload) {
      setErrorMessage("Login failed. Please check your credentials.");
    } else if ('token' in result.payload) {
      window.localStorage.setItem('token', result.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Log In</h2>
      {errorMessage && (
        <div className="mb-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">E-Mail</label>
          <input
            id="email"
            type="email"
            className={`w-full p-2 border border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
            {...register('email', { required: 'Enter email' })}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className={`w-full p-2 border border-gray-300 rounded-md ${errors.password ? 'border-red-500' : ''}`}
            {...register('password', { required: 'Enter password' })}
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" disabled={!isValid}>
          Log In
        </button> *For testing just push the button
      </form>
    </div>
  );
};