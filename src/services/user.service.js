import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/user/";

const getPublicContent = async () => {

  const result = await axios.get(API_URL , { headers: authHeader() });
  
  return result;
};

const update = (id, email, firstName, lastName, accessToken) => {
  return axios.put(API_URL , {
    id,
    email,
    firstName,
    lastName,
    accessToken
  },{ headers: authHeader() });
};

const Delete = async () => {

  const result = await axios.delete(API_URL , { headers: authHeader() });
  
  return result;
};

const userManager = {
  getPublicContent,
  update,
  Delete
};

export default userManager;
