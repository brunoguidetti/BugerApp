import axios from "axios";

const instacnce = axios.create({
  baseURL: "https://react-burguer-16c8e-default-rtdb.firebaseio.com/",
});

export default instacnce;
