import { useEffect, useState } from "react";
import { Card, Pagination, Row, Col } from "react-bootstrap";
import useFetech from "../components/useFetech";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import Notfound from "./Notfound";

import swal from "sweetalert";

const Todos = () => {
  const endpoint = "http://192.168.0.103:8000/api/";

  const [page, setPage] = useState(
    localStorage.getItem("page") ? localStorage.getItem("page") : 1
  );

  useEffect(() => {
    document.title = "Todos";
    // console.log(page);
  });

  const { preloader, data, isError, error, isFetching, refetch } = useFetech({
    key: ["todos", page],
    url: endpoint + "todos",
    page: page,
  });

  if (data?.data?.result?.length == 0) {
    return (
      <>
        <Notfound />
      </>
    );
  }

  // console.log(data?.data?.page);

  const handleDeleteNumber = (name, id) => {
    swal({
      title: "Are you sure?",
      text: "want to delete '" + name + "' todo, it will never come back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file " + id + " has been deleted!", {
          icon: "success",
        });
      }
      //  else {
      //   swal("Your imaginary data is safe!");
      // }
    });
  };

  const handlePageNumber = (active, number) => {
    refetch();
    setPage(number);
    localStorage.setItem("page", number);
  };

  let active = page;
  let max = data?.data?.pages;
  let items = [];
  for (let number = 1; number <= max; number++) {
    items.push(
      <Pagination.Item
        key={number}
        disabled={number == active}
        onClick={(e) => handlePageNumber(e, number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );

  // console.log(paginationBasic);

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
            {data?.data?.result?.map((todo) => {
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
                    <span
                      className="btn btn-danger ms-2"
                      onClick={(n, e) => handleDeleteNumber(todo.name, todo.id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              );
            })}
          </Card>
        )}

        {/* <div className="row">{process.env.API_ENDPOINT}</div> */}

        <Row className="mt-3 mb-3 align-self-center">
          <Col md={12}>{paginationBasic}</Col>
        </Row>
      </div>
    </>
  );
};

export default Todos;
