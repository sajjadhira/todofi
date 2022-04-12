import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Unauthorize from "../pages/Unauthorize";
import Logout from "./Logout";
import Mainheader from "./Mainheader";
import useFetech from "./useFetech";
const controller = new AbortController();
const endpoint = "http://192.168.0.103:8000/api/";

const Content = ({ children }) => {
  const navigate = useNavigate();

  const items = ["logged", "uid", "name", "role", "token", "session_time"];

  items.map((und) => {
    if (typeof localStorage.getItem(und) === "undefined") {
      localStorage.removeItem("logged");
      localStorage.removeItem("uid");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("session_time");

      toast.success(" LogOut Successfull", {
        toastId: "logout",
      });
      return navigate("/login/");
    }
  });

  items.map((nf) => {
    if (!localStorage.getItem(nf)) {
      localStorage.removeItem("logged");
      localStorage.removeItem("uid");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("session_time");

      toast.success(" LogOut Successfull", {
        toastId: "logout",
      });
      return navigate("/login/");
    }
  });

  // const { preloader, data, isError, error, isFetching, refetch } = useFetech({
  //   key: ["logincheck", 1],
  //   url: endpoint + "info",
  // });

  // if (!data) {
  //   localStorage.removeItem("logged");
  //   localStorage.removeItem("uid");
  //   localStorage.removeItem("name");
  //   localStorage.removeItem("role");
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("session_time");
  //   return navigate("/login/");
  // }

  return (
    <>
      <div>
        <Mainheader />
        <main className="mt-3 pt-3 main">
          <div className="container-fluid">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Content;
