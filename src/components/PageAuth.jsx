/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import LabelInput from "./LabelInput";


function PageAuth({title, subtitle, buttonText, isLogin}) {
    const [username, setUsername] = useState("Budi");
    const [email, setEmail] = useState("budi@gmail.com");
    const [password, setPassword] = useState("budi123");
    const [confirmPassword, setConfirmPassword] = useState("budi123");


    return (
        <div className="bg-[#181A1CD6] rounded-lg shadow-lg p-8 md:p-12 max-w-md w-full md:m-10">
        <div className="text-center flex flex-col justify-center items-center">
            <img src="/img/logo.png" className="mb-3" alt="" />
            <h2 className="text-white mt-2 font-bold text-3xl">{title}</h2>
            <p className="text-white mt-2">{subtitle}</p>
        </div>
        <form className="mt-6 space-y-4">
            <div className="pb-2">
                <LabelInput htmlFor="username" label="Username" />
                <input
                    autoComplete="off"
                    type="text"
                    placeholder="Masukkan username"
                    className="w-full bg-transparent text-[#C1C2C4] placeholder-gray-500 hover:placeholder-gray-400 rounded-full border px-4 py-2 focus:outline transition duration-300"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="pb-2">
                <LabelInput htmlFor="email" label="Email" />
                <input
                    autoComplete="off"
                    type="text"
                    placeholder="Masukkan email"
                    className="w-full bg-transparent text-[#C1C2C4] placeholder-gray-500 hover:placeholder-gray-400 rounded-full border px-4 py-2 focus:outline transition duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="pb-2">
                <LabelInput htmlFor="password" label="Password" />
                <input
                    autoComplete="off"
                    type="password"
                    placeholder="Masukkan kata sandi"
                    className="w-full bg-transparent text-[#C1C2C4] placeholder-gray-500 hover:placeholder-gray-400 hover:text-white rounded-full border px-4 py-2 transition duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {!isLogin && (
                <div className="pb-2">
                    <LabelInput htmlFor="confirm-password" label="Konfirmasi Kata Sandi" />
                    <input
                        autoComplete="off"
                        type="password"
                        id="confirm-password"
                        placeholder="Masukkan ulang kata sandi"
                        className="w-full bg-transparent text-[#C1C2C4] hover:placeholder-gray-400 placeholder-gray-500 rounded-full border px-4 py-2 transition duration-300"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            )}
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

            <button type="submit" className="w-full rounded-full bg-[#3D4142] text-white py-2 hover:bg-[#707174] transition duration-300">
                {buttonText}
            </button>

            <>
                <div className="text-center text-sm text-gray-400">Atau</div>
                <button type="button" className="w-full flex items-center justify-center bg-transparent text-white py-2 rounded-full border border-white hover:bg-[#707174] transition duration-300">
                    <img src="/img/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                    {title} dengan Google
                </button>
            </>
        </form>
    </div>
    );
}

export default PageAuth;