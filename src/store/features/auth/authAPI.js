import axios from 'axios'
const API_URL = 'https://spine.onrender.com/api';

export const signInAPI = async ({ username, name, email, password, mobile, code }) => {
    const response = await axios.post('https://spine.onrender.com/api/auth/signup', {
        username,
        name,
        email,
        password,
        mobile,
        code,
    });
    return response.data;
};

export const loginAPI = async ({ email, password }) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
    });
    return response.data;
};

export const fetchUserDetails = async (employeeId) => {
    console.log("Calling API for user details with employeeId:", employeeId);
    const response = await fetch(`${API_URL}/profile/${employeeId}`);
    const data = await response.json();
    console.log("API response for user details:", data);
    return data;
};

export const updateUserProfile = async (data, token) => {
    const response = await axios.put(`${API_URL}/profile/update`, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};