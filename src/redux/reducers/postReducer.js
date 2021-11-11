import * as types from "../types/postType";

const initialState = {
  isLoading: true,
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.ADD_POST:
      state = { ...state, posts: [...state.posts, action.payload] };
      return state;
    case types.GET_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case types.DELETE_POST:
      const filterPostId = state.posts.filter(
        (post) => post.postId === action.payload.postId
      );
      return { ...state, posts: filterPostId };
    case types.UPDATE_POST:
      const updatePost = state.posts.map((post) =>
        post.postId === action.payload.postId ? action.payload.updatePost : post
      );
      state = { ...state, posts: updatePost };
      return state;
    default:
      return state;
  }
};
export default postReducer;
