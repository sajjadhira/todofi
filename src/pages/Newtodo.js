import axios from "axios";
import { useState } from "react";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetech from "../components/useFetech";
import Unauthorize from "./Unauthorize";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Newtodo = () => {
  const token = localStorage.getItem("token");
  const [disabled, setDisabled] = useState(false);
  const [button, setButton] = useState("Publish");
  const [name, setName] = useState("");
  const [user, setUser] = useState(0);
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const controller = new AbortController();

  const endpoint = "http://192.168.0.103:8000/api/";

  const { preloader, data, isError, error, isFetching, refetch } = useFetech({
    key: ["new-todo-access-user-info"],
    url: endpoint + "info",
  });

  if (isFetching) {
    return <Skeleton count={1} className="mt-3" height={500} />;
  }

  if (!data) {
    return <Unauthorize />;
  }
  //   if(data)

  if (data.data.role !== "user") {
    return <Unauthorize />;
  }

  const handleName = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
  };
  const handlePublish = (e) => {
    e.preventDefault();

    if (name.length == 0) {
      toast.error("Todo name cannot be empty.");
    } else {
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

      //   console.log(payload);
      let basicConig = { method: method, url: url, data: payload };
      Object.assign(config, basicConig);

      const request = axios(config)
        .catch((err) => {
          toast.error(err.message);
          controller.abort(err);
        })
        .then((data) => {
          if (data) {
            if (data.data.message) {
              toast.error(data.data.message);
            } else {
              toast.success("Todo published successfully!");
              navigate("/todos/");
            }
          }
        });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <span className="fw-bold fs-3">New Todo</span>
        </div>
      </div>

      <Card>
        <Row className="mt-5 p-3 justify-content-center">
          <Col className="md-offset-3 col-md-6 align-self-center">
            <h3 className="text-center mt-3 mb-3">Publish TODO</h3>
            <Form>
              <Form.Group className="mb-3" controlId="basicTodo">
                <Form.Label className="fw-bold">Todo Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter todo name"
                  required={true}
                  name="name"
                  onKeyUp={handleName}
                  defaultValue={name}
                />
              </Form.Group>

              <Button
                variant="default w-100"
                className="mt-2 mb-4 bg-brand text-white"
                onClick={handlePublish}
                type="submit"
                disabled={disabled}
              >
                {button}
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Newtodo;