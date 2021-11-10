import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation";
import * as post from "../../redux/actions/index";
import * as auth from "../../redux/actions/index";
import { Card, Button } from "react-bootstrap";
import firebase from "../../config/firebase";
import { useNavigate } from "react-router";

const Home = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(post.fetchPost());
  }, [dispatch]);
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
    <div>
      <Navigation />
      {myPosts.map((myPost, index) => {
        return (
          <Card className="col-md-5 mx-auto px-0" key={index}>
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
      })}
    </div>
  );
};

export default Home;
