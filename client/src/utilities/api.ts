import { authenticationToken } from "./authentication";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const userMe = async () => {
  return axios({
    url: `/users/me`,
    method: "get",
    headers: { Authorization: authenticationToken() },
  }).then((res) => res.data);
};
