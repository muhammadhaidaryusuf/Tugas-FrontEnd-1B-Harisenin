import { API_ENDPOINTS } from "./apiServices";

const LoginUser = async (username, password) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.USERS}?username=${username}`);
      if (!response.ok) throw new Error("Failed to login");
      const users = await response.json();
      const user = users.find((u) => u.username === username && u.password === password);
      if (!user) throw new Error("Invalid credentials");
      return user;
    } catch (error) {
      console.error("Error in userService.login:", error);
      throw error;
    }
  }

export default LoginUser;