/* eslint-disable no-unused-vars */
import React from "react";

import PageAuth from "../components/PageAuth";

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div style={{ backgroundImage: "url('/img/register.png')" }} className="min-h-screen bg-cover bg-center flex items-center justify-center">
            <PageAuth
                title="Daftar"
                subtitle="Selamat Datang"
                buttonText="Daftar"
                isLogin={false}
                onSubmit={handleSubmit} />
        </div>
    );
};

export default Register;
