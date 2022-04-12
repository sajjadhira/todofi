import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const controller = new AbortController();

  const endpoint = "http://192.168.0.103:8000/api/";

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let method = "post";
  let url = endpoint + "logout";
  let basicConig = { method: method, url: url };
  Object.assign(config, basicConig);

  const request = axios(config)
    .catch((err) => {
      toast.error(err.message);
      controller.abort(err);
    })
    .then((data) => {
      if (data) {
        if (data.data.message) {
        }
      }
    });

  localStorage.removeItem("logged");
  localStorage.removeItem("uid");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("session_time");
  toast.success("LogOut Successfull");
  return navigate("/login/");
};

export default Logout;
