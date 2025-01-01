import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
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
      window.localStorage.setItem('authData', JSON.stringify(result.payload));
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <section className="dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-4 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    id="email"
                    type="email"
                    className={`w-full p-2 border border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''}`}
                    {...register('email', { required: 'Enter email' })}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <input
                    id="password"
                    type="password"
                    className={`w-full p-2 border border-gray-300 rounded-md ${errors.password ? 'border-red-500' : ''}`}
                    {...register('password', { required: 'Enter password' })}
                    placeholder="Enter your password"
                  />
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  disabled={!isValid}
                >
                  Log In
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Create Account
                  </Link>
                </p>
                {errorMessage && (
                  <div className="mb-4 text-sm text-red-600">
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};