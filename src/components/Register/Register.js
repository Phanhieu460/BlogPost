import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as auth from "../../redux/actions/index";
import firebase from "../../config/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = (data) => {
    dispatch(auth.setUser(data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: username,
        });
        const data = {
          user: user.user,
        };
        loginUser(data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <Row>
        <Col md={6} sm={12} xm={12} className="mx-auto">
          <h1 className="font-weight-bold text-center py-5">REGISTER</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Have a account? <Link to="/login">Sign In</Link>
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              REGISTER
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
