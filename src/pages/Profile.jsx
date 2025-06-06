import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../components/services/api/service";
import DeleteButton from "../components/services/api/Delete";
import UpdateButton from "../components/services/api/Update";
import Navbar from "./../components/Navbar";
import SubscriberStatus from "./../components/SubscriberStatus";
import M_List from "./My_List";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load current user data
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          const user = await userService.get(currentUser.id);
          if (user) {
            setUserData({
              id: user.id,
              username: user.username,
              email: user.email,
              password: "",
            });
          } else {
            navigate("/login");
          }
        }
      } catch (err) {
        setError("Gagal memuat data profil");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleDelete = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus akun Anda?")) {
      try {
        await userService.delete(userData.id);
        userService.logout();
        navigate("/");
      } catch (err) {
        setError("Gagal menghapus akun");
        console.error(err);
      }
    }
  };

  const handleUpdate = async () => {
    if (!userData.username || !userData.email) {
      alert("Username dan email harus diisi");
      return;
    }

    try {
      const updatedData = {
        username: userData.username,
        email: userData.email,
      };

      if (userData.password) {
        updatedData.password = userData.password;
      }

      const updatedUser = await userService.update(userData.id, updatedData);

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
        })
      );
      alert("Profil berhasil diperbarui!");
      setUserData((prev) => ({ ...prev, password: "" }));
      setError(null);
      return updatedUser;
    } catch (err) {
      setError("Gagal memperbarui profil");
      console.error(err);
    }
  };

  if (isLoading) return <div>Memuat data profil...</div>;
  if (error) return <div className="error">{error}</div>;

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
                  <input
                    type="password"
                    value={userData.password}
                    className="block w-full bg-gray-700 text-white rounded-lg p-2"
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Kosongkan jika tidak ingin mengubah"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <UpdateButton id={userData.id} onUpdate={handleUpdate} />
                <DeleteButton id={userData.id} onDelete={handleDelete} />
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
