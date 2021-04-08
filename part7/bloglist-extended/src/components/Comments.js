import React from 'react';
import { useField } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import { postComment } from '../redux/reducers/blogReducer';
import { nanoid } from 'nanoid';


const Comments = ({ blog }) => {
  const { reset: resetComment, ...commentInput } = useField('text');

  const dispatch = useDispatch();

  const addComment = (event) => {
    event.preventDefault();
    dispatch(postComment(
      blog.id,
      commentInput.value
    ));
    resetComment();
  };

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={addComment}>
        <input {...commentInput} />
        <button type='submit'>add comment</button>
      </form>

      {
        blog.comments.length > 0
          ? <ul>
            {
              blog.comments.map(comment =>
                <li key={nanoid()}>{comment}</li>
              )
            }
          </ul>
          : 'No comments yet'
      }
    </div>
  );
};


export default Comments;