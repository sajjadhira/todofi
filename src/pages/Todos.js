import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import useFetech from "../components/useFetech";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";

const Todos = () => {
  const endpoint = "http://192.168.0.103:8000/api/";

  useEffect(() => {
    document.title = "Todos";
  });

  const { preloader, data, isError, error, isFetching, refetch } = useFetech({
    key: ["todos", 1],
    url: endpoint + "todos",
  });

  // console.log(endpoint + "todos");
  // console.log(data);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 fw-bold fs-3">Todos</div>
        </div>

        {isFetching && !data ? (
          <Skeleton count={1} className="mt-3" height={500} />
        ) : (
          <Card className="mt-3">
            {data?.data.map((todo) => {
              return (
                <div key={todo.id} className="row p-3 the-shadow">
                  <div className="col-6 fw-bold fs-4">{todo.name}</div>
                  <div className="col-3">
                    {todo.status == 0 ? "Pending" : "Complete"}
                  </div>
                  <div className="col-3">
                    <Link to={"edit/" + todo.id}>
                      <span className="btn btn-primary">Edit</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Card>
        )}

        {/* <div className="row">{process.env.API_ENDPOINT}</div> */}
      </div>
    </>
  );
};

export default Todos;
