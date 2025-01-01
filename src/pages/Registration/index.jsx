import React, { useState } from 'react';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [serverError, setServerError] = useState('');
  const [avatarString, setAvatarString] = useState('');
  const inputFileRef = React.useRef(null);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarString(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values) => {
    try {
      const formData = { ...values, avatar: avatarString };
      const actionResult = await dispatch(fetchRegister(formData));
      const data = actionResult.payload;

      if (Array.isArray(data)) {
        setServerError(data[0]?.msg || "Unknown error");
      } else if (data?.token) {
        window.localStorage.setItem("token", data.token);
        setServerError("");
        return <Navigate to="/" />;

      } else {
        setServerError(data);
      }
    } catch (error) {
      setServerError(error);
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
                Create Account</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div
                      className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden cursor-pointer shadow-md flex justify-center items-center"
                      onClick={() => inputFileRef.current.click()}
                    >
                      {avatarString ? (
                        <img
                          src={avatarString}
                          alt="Avatar Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500">Upload</span>
                      )}
                    </div>

                    <input
                      ref={inputFileRef}
                      type="file"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </div>
                </div>

                <div>
                  <input
                    {...register('fullName', { required: 'Enter the full name' })}
                    className={`w-full p-2 border border-gray-300 rounded-md ${errors.fullName ? 'border-red-500' : ''
                      } `}
                    placeholder="Enter your full name"
                  />
                  <p className="text-red-500 text-xs mt-1">{errors.fullName?.message}</p>
                </div>
                <div>
                  <input
                    {...register('email', { required: 'Enter the email' })}
                    className={`w-full p-2 border border-gray-300 rounded-md ${errors.email ? 'border-red-500' : ''
                      } `}
                    placeholder="Enter your email"
                  />
                  <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
                </div>
                <div>
                  <input
                    {...register('password', { required: 'Enter the password' })}
                    type="password"
                    className={`w-full p-2 border border-gray-300 rounded-md ${errors.password ? 'border-red-500' : ''
                      } `}
                    placeholder="Enter your password"
                  />
                  <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
                </div>
                {serverError && (
                  <div className="text-red-500 text-sm text-center">
                    {serverError}
                  </div>
                )}
                <button
                  type="submit"
                  className={`w-full py-2 px-4 text-white font-bold rounded-md ${isValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  disabled={!isValid}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
