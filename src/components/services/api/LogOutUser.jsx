
const LogOutUser = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  }

export default LogOutUser;