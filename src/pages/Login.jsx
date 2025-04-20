import PageAuth from "../components/Auth/AuthForm";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ backgroundImage: "url('/img/login.png')" }} className="min-h-screen bg-cover bg-center flex items-center justify-center">
      <PageAuth title="Masuk" subtitle="Selamat Datang Kembali" buttonText="Masuk" isLogin={true} onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
