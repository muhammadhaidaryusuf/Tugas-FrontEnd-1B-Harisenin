/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LabelInput from "./../LabelInput";
import userService from "../services/api/service";
import LoginUser from "../services/api/LoginUser";

function AuthForm({ title, subtitle, buttonText, isLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async () => {
    setIsLoading(true);
    try {
      const user = await LoginUser(username, password);
      if (user) {
        alert("Login berhasil!");
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/Dashboard");
      } else {
        setError("Username atau kata sandi salah.");
      }
    } catch (err) {
      setError("Gagal melakukan login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async () => {
    if (password !== confirmPassword) {
      setError("Kata sandi dan konfirmasi kata sandi tidak cocok!");
      return;
    }

    setIsLoading(true);
    try {
      const newUser = {
        username,
        email,
        password,
      };

      const createdUser = await userService.create(newUser);
      alert("Pendaftaran berhasil! Silakan login.");
      navigate("/");
    } catch (err) {
      if (err.message.includes("409")) {
        setError("Username atau email sudah terdaftar");
      } else {
        setError("Gagal melakukan pendaftaran");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username) {
      setError("Harap isi username");
      return;
    }
    if (!isLogin && !email) {
      setError("Harap isi email");
      return;
    }
    if (!password) {
      setError("Harap isi password");
      return;
    }

    if (isLogin) {
      await loginUser();
    } else {
      await registerUser();
    }
  };

  return (
    <div className="bg-[#181A1CD6] rounded-lg shadow-lg p-8 md:p-12 max-w-md w-full md:m-10">
      <div className="text-center flex flex-col justify-center items-center">
        <img src="/img/logo.png" className="mb-3" alt="" />
        <h2 className="text-white mt-2 font-bold text-3xl">{title}</h2>
        <p className="text-white mt-2">{subtitle}</p>
      </div>

      {error && <div className="mt-4 p-3 bg-red-500 text-white rounded-lg">{error}</div>}

      <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
        <div className="pb-2">
          <LabelInput htmlFor="username" label="Username" />
          <input
            autoComplete="off"
            type="text"
            placeholder="Masukkan username"
            className="w-full bg-transparent text-[#C1C2C4] placeholder-gray-500 hover:placeholder-gray-400 rounded-full border px-4 py-2 focus:outline transition duration-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {!isLogin && (
          <div className="pb-2">
            <LabelInput htmlFor="email" label="Email" />
            <input
              autoComplete="off"
              type="email"
              placeholder="Masukkan email"
              className="w-full bg-transparent text-[#C1C2C4] placeholder-gray-500 hover:placeholder-gray-400 rounded-full border px-4 py-2 focus:outline transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        )}

        <div className="pb-2">
          <LabelInput htmlFor="password" label="Password" />
          <input
            autoComplete="off"
            type="password"
            placeholder="Masukkan kata sandi"
            className="w-full bg-transparent text-[#C1C2C4] placeholder-gray-500 hover:placeholder-gray-400 hover:text-white rounded-full border px-4 py-2 transition duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {!isLogin && (
          <div className="pb-2">
            <LabelInput htmlFor="confirm-password" label="Konfirmasi Kata Sandi" />
            <input
              autoComplete="off"
              type="password"
              placeholder="Masukkan ulang kata sandi"
              className="w-full bg-transparent text-[#C1C2C4] hover:placeholder-gray-400 placeholder-gray-500 rounded-full border px-4 py-2 transition duration-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        )}

        <div className="pt-2">
          <button type="submit" className="w-full rounded-full bg-[#3D4142] text-white py-2 hover:bg-[#707174] transition duration-300 disabled:opacity-50" disabled={isLoading}>
            {isLoading ? "Memproses..." : buttonText}
          </button>
        </div>

        {isLogin ? (
          <div className="flex items-center justify-between text-sm">
            <Link to="/register" className="text-[#C1C2C4] hover:text-white hover:underline transition duration-300">
              Belum punya akun? <b>Daftar</b>
            </Link>
            <Link to="/forgot-password" className="text-[#C1C2C4] hover:underline hover:text-white transition duration-300">
              Lupa kata sandi?
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between text-sm">
            <Link to="/" className="text-[#C1C2C4] hover:text-white hover:underline transition duration-300">
              Sudah punya akun? <b>Masuk</b>
            </Link>
          </div>
        )}

        <div className="text-center text-sm text-gray-400">Atau</div>
        <button type="button" className="w-full flex items-center justify-center bg-transparent text-white py-2 rounded-full border border-white hover:bg-[#707174] transition duration-300 disabled:opacity-50" disabled={isLoading}>
          <img src="/img/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
          {title} dengan Google
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
