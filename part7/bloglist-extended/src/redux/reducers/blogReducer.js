import blogs from '../../services/blogs';
import blogService from '../../services/blogs';
import { blogsFetched, blogCreated, blogDeleted, blogUpdated } from '../actions';


const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.payload;
    case 'ADD_BLOG':
      return [...state, action.payload];
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.payload);
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id !== action.payload.blogId ? blog : action.payload.blogObject)
    default:
      return state;
  }
};

// Thunk functions
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(blogsFetched(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const blog = await blogService.create(blogObject);
    dispatch(blogCreated(blog));
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.drop(blogId);
    dispatch(blogDeleted(blogId));
  };
};

export const updateBlog = (blogId, blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogId, blogObject);
    dispatch(blogUpdated(blogId, updatedBlog));
  };
};

export const postComment = (blogId, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(blogId, comment)
    dispatch(blogUpdated(blogId, commentedBlog))
  }
}

export default blogReducer;
