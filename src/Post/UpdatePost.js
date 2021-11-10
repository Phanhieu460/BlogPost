import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Container, Row, Button, Col } from "react-bootstrap";
import Navigation from "../components/Navigation";
import * as post from "../redux/actions/index";

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const posts = useSelector((state) => state.posts.posts);
  const currentPost = posts.find((post) => post.postId === postId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.postData.title);
      setCategory(currentPost.postData.category);
      setDescription(currentPost.postData.description);
    }
  }, [currentPost, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, description, category };
    dispatch(post.updatePostData(currentPost, postId, data));
  };
  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col md={12} className=" mb-3">
            <h1 className="display-3 text-dark text-center">Edit Post</h1>
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
                  value="Update Post"
                />
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => navigate("/")}
                >
                  Go Back
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditPost;
