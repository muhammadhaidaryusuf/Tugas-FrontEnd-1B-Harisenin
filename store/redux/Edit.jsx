/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userService from "../../src/components/services/api/service";
import UpdateButton from "../../src/components/services/api/Update";

const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};

  const [formData, setFormData] = useState({
    username: userData?.username || "",
    email: userData?.email || "",
    password: userData?.password || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/listView");
  };

  const handleUpdateSuccess = () => {
    navigate("/listView");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Data</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent"
            placeholder="Masukkan username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent"
            placeholder="Masukkan email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-transparent"
            placeholder="Masukkan password"
            required
          />
        </div>
        <div className="flex gap-2">
          <UpdateButton id={userData?.id} updatedData={formData} onUpdateSuccess={handleUpdateSuccess} />
          <button type="button" onClick={handleBack} className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition duration-300">
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
