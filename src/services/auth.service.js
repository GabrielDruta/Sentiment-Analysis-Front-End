import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const register = (email, password, firstName, lastName, accessToken) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
    firstName,
    lastName,
    accessToken
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


const authManager = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authManager;