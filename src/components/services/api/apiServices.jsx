export const API_ENDPOINTS = {
  USERS: `${import.meta.env.VITE_API_URL}`,
  POSTS: `${import.meta.env.VITE_API_URL}/posts`, // Contoh tambahan
  // Tambahkan endpoint lain sesuai kebutuhan
};

// Fungsi khusus untuk users
export const fetchUsers = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.USERS);
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fungsi khusus untuk posts
export const fetchPosts = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.POSTS);
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
