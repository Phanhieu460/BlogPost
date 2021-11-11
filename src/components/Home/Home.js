import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation";
import * as post from "../../redux/actions/index";
import * as auth from "../../redux/actions/index";
import { Card, Button } from "react-bootstrap";
import firebase from "../../config/firebase";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const posts = useSelector((state) => state.posts.posts);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoading) {
      dispatch(post.fetchPost());
    }
  }, [isLoading, dispatch]);
  const myPosts = posts;
  const navigate = useNavigate();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        navigate("/login");
        return;
      }
      const data = {
        user: user.providerData[0],
        id: user.uid,
      };
      dispatch(auth.loginUser(data));
    });
  }, []);
  return (
    <>
      <Navigation />
      {isLoading ? (
        <h1 className="text-center my-5">Loading...</h1>
      ) : myPosts.length < 1 || posts.length < 1 ? (
        <h1 className="text-center my-5">No Post</h1>
      ) : (
        myPosts.map((myPost, index) => {
          return (
            <Card
              className="col-md-5 mx-auto px-0 mb-3"
              style={{ display: "flex" }}
              key={index}
            >
              <Card.Body>
                <Card.Title>{myPost.postData.title}</Card.Title>
                <Card.Subtitle>{myPost.postData.description}</Card.Subtitle>
              </Card.Body>
              <Card.Footer className="bg-white">
                <Button
                  type="button"
                  variant="primary"
                  className="form-control my-2"
                  onClick={() => navigate(`/post/${myPost.postId}`)}
                >
                  See Post
                </Button>
                <div className="d-flex w-100 px-5 mb-5 py-2 align-items-center justify-content-end">
                  <Button
                    type="button"
                    variant="outline-primary"
                    className="mx-2"
                    onClick={() => navigate(`/post/${myPost.postId}/edit`)}
                  >
                    Edit Post
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    className="mx-2"
                    onClick={() => dispatch(post.removePost(myPost.postId))}
                  >
                    Delete Post
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          );
        })
      )}
    </>
  );
};

export default Home;
