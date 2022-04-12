import { useContext } from "react";
import { globalContext } from "../App";

const Unauthorize = () => {
  const context = useContext(globalContext);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="mt-5 text-center">
            <span className="mt-5 fs-2 fw-bold">Unauthorize Access!</span>
            <p className="text-muted">
              You are unauthorise to access this page. plese contact with
              support <strong>{context.support_email}</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorize;
