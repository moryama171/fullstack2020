// Action creators
export const blogsFetched = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    payload: blogs
  };
};

export const blogCreated = (blog) => {
  return {
    type: 'ADD_BLOG',
    payload: blog
  };
};

export const blogDeleted = (blogId) => {
  return {
    type: 'REMOVE_BLOG',
    payload: blogId
  };
};

export const blogUpdated = (blogId, blogObject) => {
  return {
    type: 'UPDATE_BLOG',
    payload: {
      blogId,
      blogObject
    }
  };
};

export const userSet = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  };
};

export const userCleared = () => {
  return {
    type: 'CLEAR_USER',
    payload: null
  };
};

export const notificationSet = (message, error) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: {
      message,
      error
    }
  };
};