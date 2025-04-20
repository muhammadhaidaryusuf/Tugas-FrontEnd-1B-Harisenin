const userService = {
    // CREATE - Menyimpan user baru
    createUser: (user) => {
      const users = userService.getAllUsers();
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    },
  
    // READ - Mendapatkan semua user
    getAllUsers: () => {
      const users = localStorage.getItem("users");
      return users ? JSON.parse(users) : [];
    },
  
    // READ - Mendapatkan user by ID
    getUserById: (id) => {
      const users = userService.getAllUsers();
      return users.find((user) => user.id === id);
    },
  
    // UPDATE - Memperbarui user
    updateUser: (id, updatedData) => {
      const users = userService.getAllUsers();
      const updatedUsers = users.map((user) => (user.id === id ? { ...user, ...updatedData } : user));
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    },
  
    // DELETE - Menghapus user
    deleteUser: (id) => {
      const users = userService.getAllUsers();
      const filteredUsers = users.filter((user) => user.id !== id);
      localStorage.setItem("users", JSON.stringify(filteredUsers));
    },
    
  // Login user
  login: (username, password) => {
    const users = userService.getAllUsers();
    return users.find((user) => user.username === username && user.password === password);
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  },
};

export default userService
