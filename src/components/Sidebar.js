import { Offcanvas, Collapse } from "react-bootstrap";

// import { FaProductHunt, FaBraille, FaUsers } from "react-icons/fa";

import {
  // BiCategoryAlt,
  BiChevronDown,
  BiCircle,
  BiTable,
} from "react-icons/bi";

import { RiShieldUserFill } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";
import { useState, useContext } from "react";

import { Link } from "react-router-dom";

import Image from "react-bootstrap/Image";
import avatar from "../images/avatar.jpg";

import { globalContext } from "../App";

const Sidebar = () => {
  const [pagesmenu, setpagesmenu] = useState(false);

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  // const token = localStorage.getItem("token");

  const context = useContext(globalContext);

  return (
    <>
      <Offcanvas.Header closeButton>
        <Link to="/">
          <Offcanvas.Title className="text-center">
            <span className="brand-text">{context.brand_name}</span>
          </Offcanvas.Title>
        </Link>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-2">
        <div className="pt-3 text-center sidear-profile">
          <div className="avatar">
            <Image src={avatar} roundedCircle={true} />
          </div>
          <div className="name pt-1 fw-bold">{name}</div>
          <div className="role pt-1 fw-light">{role.toUpperCase()}</div>
        </div>
        <ul className="navbar-nav sidebar mt-5">
          <li>
            <div className="text-muted small fw-bold text-uppercase">
              at your service
            </div>
          </li>

          <li className="mt-3">
            <Link to="/todofi/" className="nav-link px-3 sidebar-link">
              <span>
                <AiOutlineDashboard className="me-2" />
              </span>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="mt-3">
            <Link to="/todos/" className="nav-link px-3 sidebar-link">
              <span className="me-2">
                <BiTable />
              </span>
              <span>All Todos</span>
            </Link>
          </li>
        </ul>
      </Offcanvas.Body>
    </>
  );
};

export default Sidebar;
