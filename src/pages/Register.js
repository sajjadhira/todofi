import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../App";

const Register = () => {
  const user = useContext(globalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.logged) {
      navigate("/dashboard/");
    }
  });

  return <></>;
};

export default Register;
