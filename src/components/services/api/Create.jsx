import { API_ENDPOINTS } from "./apiServices";

const Create = async (userData) => {
    const response = await fetch(API_ENDPOINTS.USERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to create user");
    return response.json();
}

export default Create;