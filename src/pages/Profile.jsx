import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Navbar from "./../components/Navbar";
import M_List from "./My_List";
import SubscriberStatus from "./../components/SubscriberStatus";
import userService from "../components/services/api/service";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    password: "", // Hanya untuk perubahan password
  });

  // Load current user data
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      const user = userService.getUserById(currentUser.id);
      if (user) {
        setUserData({
          id: user.id,
          username: user.username,
          email: user.email,
          password: "", // Jangan tampilkan password asli
        });
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleDelete = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus akun Anda?")) {
      userService.deleteUser(userData.id);
      userService.logout();
      navigate("/");
    }
  };

  const handleUpdate = () => {
    if (!userData.username || !userData.email) {
      alert("Username dan email harus diisi");
      return;
    }

    const updatedData = {
      username: userData.username,
      email: userData.email,
    };

    // Hanya update password jika diisi
    if (userData.password) {
      updatedData.password = userData.password;
    }

    userService.updateUser(userData.id, updatedData);

    // Update currentUser di localStorage
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: userData.id,
        username: userData.username,
        email: userData.email,
      })
    );

    alert("Profil berhasil diperbarui!");
    setUserData((prev) => ({ ...prev, password: "" })); // Reset password field
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="px-14 mt-12">
          <div className="grid sm:grid-cols-2 mt-2 sm:mt-7 sm:gap-10 gap-4 grid-cols-1 mb-9">
            <div className="profile flex flex-col sm:order-first order-last">
              <div className="title mb-5">
                <h3 className="font-semibold">Profile Saya</h3>
              </div>
              <div className="flex gap-8 items-center">
                <img src="/img/user.png" alt="" className="rounded-full sm:w-24 w-16 border" />
                <div className="ket flex flex-col gap-4">
                  <button className="bg-transparent border px-2 py-1 text-[#09147A] text-sm rounded-full border-[#09147A] hover:border-blue-300 hover:bg-[#5160ef] transition duration-300">Ubah Foto</button>
                  <h6>
                    <i className="fa-regular fa-bookmark mr-1" />
                    Maks. 2mb
                  </h6>
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <div className="mb-4 bg-gray-700 rounded-lg">
                  <label className="block text-sm font-medium mb-2 text-[#9D9EA1] px-2">Nama Pengguna</label>
                  <input type="text" value={userData.username} className="block w-full bg-gray-700 text-white rounded-lg p-2" onChange={(e) => handleInputChange("username", e.target.value)} />
                </div>
                <div className="mb-4 bg-gray-700 rounded-lg">
                  <label className="block text-sm font-medium mb-2 text-[#9D9EA1] px-2">Email</label>
                  <input type="email" value={userData.email} className="block w-full bg-gray-700 text-white rounded-lg p-2" onChange={(e) => handleInputChange("email", e.target.value)} />
                </div>
                <div className="mb-4 bg-gray-700 rounded-lg">
                  <label className="block text-sm font-medium mb-2 text-[#9D9EA1] px-2">Kata Sandi</label>
                  <input type="password" value={userData.password} className="block w-full bg-gray-700 text-white rounded-lg p-2" onChange={(e) => handleInputChange("password", e.target.value)} />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={handleUpdate} className="bg-[#09147A] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Simpan Perubahan
                </button>
                <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
                  Hapus Akun
                </button>
              </div>
            </div>
            <div className="Subscribe">
              <SubscriberStatus isSubscribed={false} />
            </div>
          </div>
          <M_List />
        </div>
      </section>
    </>
  );
};

export default Profile;
