import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import useFetech from "../components/useFetech";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Todos = () => {
  const endpoint = "http://192.168.0.103:8000/api/";

  useEffect(() => {
    document.title = "Todos";
  });

  const { preloader, data, isError, error, isFetching, refetch } = useFetech({
    key: "todos",
    url: endpoint + "todos",
  });

  console.log(data);

  return (
    <>
      <div className="row">
        <div className="col-md-12 fw-bold fs-3">Todos</div>
      </div>

      {isFetching ? (
        <Skeleton count={1} className="mt-3" height={300} />
      ) : (
        <Card className="mt-3">
          <Table responsive>
            <thead>
              <tr>
                <td>Todo Name</td>
                <td>Todo Status</td>
              </tr>
            </thead>

            <tbody>
              {data?.data.map((todo) => {
                return (
                  <tr>
                    <td>{todo.name}</td>
                    <td>{todo.status == 0 ? "Pending" : "Complete"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      )}

      <div className="row">{process.env.API_ENDPOINT}</div>
    </>
  );
};

export default Todos;
