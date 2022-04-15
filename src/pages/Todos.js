import { useEffect, useState } from "react";
import { Card, Pagination, Row, Col } from "react-bootstrap";
import useFetech from "../components/useFetech";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import Notfound from "./Notfound";

import swal from "sweetalert";

import {
  AiFillPlusCircle,
  AiTwotoneEdit,
  AiFillDelete,
  AiOutlineCheckSquare,
  AiOutlineUndo,
} from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const Todos = () => {
  const endpoint = process.env.REACT_APP_API_ENDPOINT;
  const controller = new AbortController();

  const [page, setPage] = useState(
    localStorage.getItem("page") ? localStorage.getItem("page") : 1
  );

  console.log(endpoint);
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

  const handleDelete = (id) => {
    const responseOfDelete = {
      message: "Your requested task " + id + " has deleted succesffuly",
      type: "success",
    };
    return responseOfDelete;
  };

  const handleDeleteNumber = (name, id) => {
    swal({
      title: "Are you sure?",
      text: "want to delete '" + name + "' todo, it will never come back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const resultDelete = handleDelete(id);
        swal(resultDelete.message, {
          icon: resultDelete.type,
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

  const newAdd = () => {
    swal({
      text: "Add TODO Name",
      content: "input",
      button: {
        text: "Save",
        closeModal: false,
      },
    })
      .then((name) => {
        if (!name) throw null;

        // return fetch(
        //   `https://itunes.apple.com/search?term=${name}&entity=movie`
        // );

        var err = "";
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        if (
          typeof localStorage.getItem("token") !== "undefined" &&
          localStorage.getItem("token") != null
        ) {
          const token = localStorage.getItem("token");
          const auth = {
            Authorization: "Bearer " + token,
          };
          Object.assign(config.headers, auth);
        }
        let method = "post";
        let payload = { name };
        let url = endpoint + "todos";

        let basicConig = {
          method: method,
          url: url,
          data: payload,
        };

        Object.assign(config, basicConig);

        const request = axios(config)
          .catch((err) => {
            toast.error(err.message);
            controller.abort(err);
          })
          .then((data) => {
            if (data) {
              if (data.data.message) {
                return swal("Error", err.message, "error");
              } else {
                setPage(1);
                localStorage.setItem("page", 1);
                refetch();

                swal.stopLoading();
                swal.close();
              }
            }
          });
      })
      .catch((err) => {
        if (err) {
          swal("Oh noes!", "The AJAX request failed!", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
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

  const handleStatus = (status, id) => {
    swal({
      title: "Are you sure?",
      text: "want to update this todo?",
      icon: "info",
      buttons: true,
      dangerMode: false,
    }).then((willUpdate) => {
      if (willUpdate) {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        if (
          typeof localStorage.getItem("token") !== "undefined" &&
          localStorage.getItem("token") != null
        ) {
          const token = localStorage.getItem("token");
          const auth = {
            Authorization: "Bearer " + token,
          };
          Object.assign(config.headers, auth);
        }
        let method = "post";
        let payload = { status };
        let url = endpoint + "todos/" + id;

        //   console.log(payload);
        let basicConig = {
          method: method,
          url: url,
          data: payload,
        };
        Object.assign(config, basicConig);

        const request = axios(config)
          .catch((err) => {
            toast.error(err.message);
            controller.abort(err);
          })
          .then((data) => {
            refetch();
          });
      }
      //  else {
      //   swal("Your imaginary data is safe!");
      // }
    });
  };
  // console.log(paginationBasic);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 fw-bold fs-3">Todos</div>
          <div className="col-md-6 float-end text-end">
            <button className="btn btn-primary" onClick={newAdd}>
              <AiFillPlusCircle /> Add Todo
            </button>
          </div>
        </div>

        {isFetching && !data ? (
          <Skeleton count={1} className="mt-3" height={500} />
        ) : (
          <Card className="mt-3">
            {data?.data?.result?.map((todo) => {
              return (
                <div key={todo.id} className="row p-3 the-shadow">
                  <div className="col-6 fw-bold fs-4">{todo.name}</div>
                  <div className="col-2">
                    {todo.status == 0 ? (
                      <span className="badge bg-primary text-white">
                        Pending
                      </span>
                    ) : (
                      <span className="badge bg-success text-white">
                        Complete
                      </span>
                    )}
                  </div>
                  <div className="col-4">
                    <Link to={"edit/" + todo.id}>
                      <span className="btn btn-primary">
                        <AiTwotoneEdit /> Edit
                      </span>
                    </Link>
                    <span
                      className="btn btn-danger ms-2"
                      onClick={(n, e) => handleDeleteNumber(todo.name, todo.id)}
                    >
                      <AiFillDelete /> Delete
                    </span>

                    {todo.status == 0 ? (
                      <button
                        className="ms-2 btn btn-success"
                        onClick={(n, e) => handleStatus(1, todo.id)}
                      >
                        <AiOutlineCheckSquare /> Mark as Complete
                      </button>
                    ) : (
                      <button
                        className="ms-2 btn btn-warning"
                        onClick={(n, e) => handleStatus(0, todo.id)}
                      >
                        <AiOutlineUndo /> Undo Complete
                      </button>
                    )}
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
