import { API_ENDPOINTS } from "./apiServices";

const GetData = async (id) => {
    const response = await fetch(`${API_ENDPOINTS.USERS}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
}

export default GetData;