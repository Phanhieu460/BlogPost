import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { Col, Container, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as post from "../redux/actions/index";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const reset = () => {
    setTitle("");
    setDescription("");
    setCategory("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
      category: category,
    };
    dispatch(post.doPost(data));
    // reset();
  };
  return (
    <div>
      <Navigation />
      <Container>
        <Row>
          <Col md={12} style={{ textAlign: "right" }} className="my-5">
            <Button as={Link} to="/" variant="dark" className="mr-2">
              Go Back
            </Button>
          </Col>
          <Col md={12} className=" mb-3">
            <h1 className="display-3 text-dark text-center">Add Post</h1>
          </Col>
          <Col md={6} className="mx-auto mb-5 shadow p-5">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="category"
                  placeholder="Categories"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Enter Description"
                  className="form-control"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-dark btn-block"
                  value="Add Post"
                />
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPost;
