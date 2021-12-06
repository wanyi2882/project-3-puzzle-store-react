import axios from "axios";

// Login Route and adding user details to local Store
const login = async (email, password) => {
  return axios.post(process.env.REACT_APP_URL + "/api/users/login", {
        "email": email,
        "password": password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

// Logout (Remove user details from local Storage)
const logout = () => {
  localStorage.removeItem("user");
};

// Retrieve existing user details
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser
};

export default AuthService;