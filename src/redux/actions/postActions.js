import * as types from "../types/postType";
import firebase from "../../config/firebase";

export const addPost = (data) => ({
  type: types.ADD_POST,
  payload: data,
});
export const getPost = (data) => ({
  type: types.GET_POST,
  payload: data,
});
const deletePost = (data) => ({
  type: types.DELETE_POST,
  payload: data,
});
const updatePost = (data) => ({
  type: types.UPDATE_POST,
  payload: data,
});
export const doPost = (data) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .add(data)
      .then(async (res) => {
        // console.log(res);
        const document = await res.get();
        const postData = { data: document.data(), id: document.id };
        dispatch(addPost(postData));
        alert("Post created successfully");
      })
      .catch((err) => console.log(err));
  };
};
export const fetchPost = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then((posts) => {
        const allPosts = [];
        posts.forEach((post) => {
          const data = { postData: post.data(), postId: post.id };
          allPosts.push(data);
        });
        dispatch(getPost(allPosts));
      })
      .catch((err) => console.log(err));
  };
};
export const removePost = (postId) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .delete()
      .then(() => {
        dispatch(deletePost(postId));
        alert("Succesfully deleted the post");
      })
      .catch((err) => console.log(err));
  };
};
export const updatePostData = (prevPost, postId, data) => {
  return (dispatch) => {
    const { title, description, category } = data;
    prevPost.postData.title = title;
    prevPost.postData.category = category;
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({ title, description, category })
      .then(() => {
        dispatch(updatePost({ postId, updatePost: prevPost }));
        alert("Update Successfully");
      })
      .catch((err) => console.log(err));
  };
};
