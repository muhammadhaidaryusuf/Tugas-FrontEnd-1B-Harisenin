// API CRUD

import { API_ENDPOINTS } from "./apiServices";

const userService = {
  // Menggunakan Mock API
  // GET All Users

  get: async () => {
    const response = await fetch(API_ENDPOINTS.USERS);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  },

  // CREATE User
  create: async (userData) => {
    try {

    await new Promise(resolve => setTimeout(resolve, 300));

      // 1. Ambil data terbaru
    const users = await fetch(API_ENDPOINTS.USERS)
      .then(res => res.json());
    
    // 2. Validasi unik
    const usernameExist = users.some(u => 
      u.username.toLowerCase() === userData.username.toLowerCase()
    );
    const emailExist = users.some(u => 
      u.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (usernameExist || emailExist) {
      throw new Error(
        JSON.stringify({
          username: usernameExist ? "Username sudah digunakan" : "",
          email: emailExist ? "Email sudah terdaftar" : ""
        })
      );
    }
      const response = await fetch(API_ENDPOINTS.USERS, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Gagal membuat user baru");
      }

      return response.json();
    } catch (error) {
      console.error("Error in userService.create:", error);
      throw error;
    }
  },

  // UPDATE User
  update: async (id, updatedData) => {
    const response = await fetch(`${API_ENDPOINTS.USERS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return response.json();
  },

  // DELETE User
  delete: async (id) => {
    const response = await fetch(`${API_ENDPOINTS.USERS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      }
    });
    if (!response.ok) throw new Error("Failed to delete user");
    return true;
  },

  // Login user
  // Login user (versi API)
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.USERS}?username=${username}`);
      if (!response.ok) throw new Error("Failed to login");
      const users = await response.json();
      const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
      if (!user) throw new Error("Invalid credentials");
      return user;
    } catch (error) {
      console.error("Error in userService.login:", error);
      throw error;
    }
  },
  // login: (username, password) => {
  //   const users = userService.getAllUsers();
  //   return users.find((user) => user.username === username && user.password === password);
  // },

  // Logout user
  logout: () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  },
};

export default userService;

// // CREATE - Menyimpan user baru
// createUser: (user) => {
//   const users = userService.getAllUsers();
//   users.push(user);
//   localStorage.setItem("users", JSON.stringify(users));
// },

// // READ - Mendapatkan semua user
// getAllUsers: () => {
//   const users = localStorage.getItem("users");
//   return users ? JSON.parse(users) : [];
// },

// // READ - Mendapatkan user by ID
// getUserById: (id) => {
//   const users = userService.getAllUsers();
//   return users.find((user) => user.id === id);
// },

// // UPDATE - Memperbarui user
// updateUser: (id, updatedData) => {
//   const users = userService.getAllUsers();
//   const updatedUsers = users.map((user) => (user.id === id ? { ...user, ...updatedData } : user));
//   localStorage.setItem("users", JSON.stringify(updatedUsers));
// },

// // DELETE - Menghapus user
// deleteUser: (id) => {
//   const users = userService.getAllUsers();
//   const filteredUsers = users.filter((user) => user.id !== id);
//   localStorage.setItem("users", JSON.stringify(filteredUsers));
// },
