import {
  Navbar,
  Nav,
  Offcanvas,
  NavDropdown,
  Form,
  Container,
  FormControl,
  Button,
  InputGroup,
  Badge,
} from "react-bootstrap";

import { FaSearch } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { BsToggleOff } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

import { useMediaQuery } from "react-responsive";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { globalContext } from "../App";
import axios from "axios";

const Mainheader = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => {
    setShow((s) => !s);
  };

  const navigate = useNavigate();
  const { brand_name } = useContext(globalContext);

  // interaging logout
  const handleLogout = () => {
    /*
    const controller = new AbortController();

    const endpoint = "http://192.168.0.103:8000/api/";

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let method = "post";
    let url = endpoint + "logout";
    let basicConig = { method: method, url: url };
    Object.assign(config, basicConig);

    const request = axios(config)
      .catch((err) => {
        // toast.error(err.message, {
        //   toastId: "logout",
        // });
        controller.abort(err);
      })
      .then((data) => {
        if (data) {
          if (data.data.message) {
          }
        }
      });
      */

    localStorage.removeItem("logged");
    localStorage.removeItem("uid");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("session_time");
    toast.success("LogOut Successfull", {
      toastId: "logout",
    });
    return navigate("/login/");
  };

  const isLaptop = useMediaQuery({
    query: "(min-device-width: 1024px)",
  });

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 1200px)",
  });

  const isBigScreen = useMediaQuery({
    query: "(min-device-width: 1201px )",
  });

  useEffect(() => {
    document.title = "Dashboard";
    if (isLaptop || isDesktop || isBigScreen) {
      setShow(true);
    }
  }, [isDesktop, isLaptop, isBigScreen]);

  return (
    <>
      <ToastContainer />
      <Navbar bg="default" className="bg-light shadow" expand="lg">
        <Container fluid>
          <Link to="/">
            <Navbar.Brand className="brand-text me-2">
              {brand_name}
            </Navbar.Brand>
          </Link>

          <Button
            variant="default"
            onClick={toggleShow}
            className="me-auto text-brand"
          >
            <BsToggleOff className="fs-4" />
          </Button>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex ms-auto">
              <InputGroup className="my-3 my-lg-0">
                <FormControl
                  placeholder="Search..."
                  aria-label="Search..."
                  aria-describedby="search-button"
                  className="search-input"
                />
                <Button
                  variant="outline-secondary"
                  id="search-button"
                  className="bg-brand text-white"
                >
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>

            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <Button variant="default">
              <IoMdNotificationsOutline className="fs-3 ms-0 me-0" />
              <Badge bg="danger">9</Badge>
            </Button>

            <Button variant="default">
              <BiMailSend className="fs-3 ms-0 me-0" />
              <Badge bg="primary">3</Badge>
            </Button>

            <NavDropdown title="Menu" id="navbarScrollingDropdown" align="end">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas
        id="navbarScroll"
        className="sidebar-nav bg-light"
        show={show}
        onHide={handleClose}
        backdrop={false}
        scroll={true}
      >
        <Sidebar />
      </Offcanvas>
    </>
  );
};

export default Mainheader;
