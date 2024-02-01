import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.10.10.37:8000/api/v1/",
});

//   const instance = axios.create({
//   baseURL: "https://api.tteld.co/api/v1/",
// });
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      localStorage.removeItem("admin_id");
    }
    return Promise.reject(error);
  }
);

const accessToken: string | null = localStorage.getItem("access_token");
if (accessToken) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

export default instance;                                                                    