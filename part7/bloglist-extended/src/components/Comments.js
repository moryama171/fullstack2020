import React from 'react';
import { useField } from '../redux/hooks';
import { useDispatch } from 'react-redux';
import { postComment } from '../redux/reducers/blogReducer';
import { nanoid } from 'nanoid';
import { Button } from 'semantic-ui-react';


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
        <Button color='pink' type='submit' style={{ 'marginLeft': '1.2em' }}>add comment</Button>
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