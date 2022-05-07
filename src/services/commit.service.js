import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/comment/";

const getAllComment = async () => {

    const result = await axios.get(API_URL , { headers: authHeader() });
    
    return result;
  };

  const commentManager = {
    getAllComment
  };
  
  export default commentManager;
  