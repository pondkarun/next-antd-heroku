import Axios from "axios";

export default Axios.create({
  baseURL: "https://www.itgenius.co.th/sandbox_api/cpallstockapi/public/api",
  headers: {
    "Content-Type": "application/json",
  },
});
