import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Idlelogin = () => {
  // searching for login

  const navigate = useNavigate();

  function IdeleLogin() {}

  useEffect(() => {
    if (
      typeof localStorage.getItem("logged") !== "undefined" &&
      localStorage.getItem("logged") &&
      localStorage.getItem("logged") !== null
    ) {
      const session_time = localStorage.getItem("session_time");

      // checking for logout time
      const checkforsession = setInterval(() => {
        var cd = new Date();
        var sd = new Date(session_time);

        if (
          typeof localStorage.getItem("session_time") === "undefined" ||
          cd > sd
        ) {
          clearInterval(checkforsession);
          localStorage.clear();
          const toastId = "session-expire";
          toast.error("Session Expired!", {
            toastId: toastId,
          });

          navigate("/login");
        }
      }, 100);
      // checking for logout time
    }
  });

  return <></>;
};

export default Idlelogin;
