import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as auth from "../../redux/actions/index";
import firebase from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        const data = {
          user: user.user,
        };
        dispatch(auth.loginUser(data));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <Row>
        {/* <h1 className="font-weight-bold text-center py-5">SIGN IN</h1> */}
        <Col md={6} sm={12} xm={12} className="mx-auto">
          <h1 className="font-weight-bold text-center py-5">SIGN IN</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Do not have account? <Link to="/register">Register</Link>
              </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="form-control">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
