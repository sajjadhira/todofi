import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mainheader from "./Mainheader";

const Content = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !localStorage.getItem("logged") &&
      localStorage.getItem("logged") === null
    ) {
      return navigate("/login/");
    }
  });
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
