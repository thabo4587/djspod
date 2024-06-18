import React, { useState } from 'react';

const SignUp= () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

 


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // If there's an error, set it using setError('Your error message')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">
              Already a member?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Log In
              </a>
            </p>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Sign up
            </button>
          </div>
        </form>
    <p className="mt-4 text-sm text-center text-red-500">error</p>
      </div>
    </div>
  );
};

export default SignUp;