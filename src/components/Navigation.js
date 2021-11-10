import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../redux/actions/index";
import firebase from "../config/firebase";
import { Button, Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    firebase.auth().signOut();
    dispatch(auth.resetUser());
  };

  return (
    <Navbar bg="dark" variant={"dark"} className="navbar-dark">
      <Navbar.Brand as={Link} to="/" className="ml-5">
        Home
      </Navbar.Brand>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/addpost">
            Add Post
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div
        className="col-md-3 d-flex align-items-center justify-content-end"
        style={{ marginLeft: "auto", marginRight: "5%" }}
      >
        {isLogin ? (
          <Fragment>
            <p className="my-0 h-100">
              Welcome to,
              <span
                style={{ fontWeight: "bold", marginRight: 5, marginTop: 5 }}
              >
                {" "}
                {user.displayName}
              </span>
            </p>
            <Button
              type="button"
              variant="success"
              size="sm"
              bg="success"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </Fragment>
        ) : (
          <Button onClick={() => navigate("/login")}>Login</Button>
        )}
      </div>
    </Navbar>
  );
};

export default Navigation;
