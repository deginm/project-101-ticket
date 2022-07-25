import axios from 'axios';

const API_URL = 'api/user';


const storeUserDetalis = (name, details) => {
    localStorage.setItem(name, JSON.stringify(details))
}
// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response) {
        storeUserDetalis('user', response.data)
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response) {
        storeUserDetalis('user', response.data)
    }
    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService