import React from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks';


const CreateNew = (props) => {
  // Let's separate reset from the rest of the attributes
  // because we won't need reset as <input> attribute
  // but we will need it in the resetAll() function
  const {reset: resetContent, ...content} = useField('content');
  const {reset: resetAuthor, ...author} = useField('author');
  const {reset: resetInfo, ...info} = useField('info');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    });
    history.push('/');
  };

  const resetAll = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
            <input {...content} />
        </div>
        <div>
          author
            <input {...author} />
        </div>
        <div>
          url for more info
            <input {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={resetAll}>reset</button>
    </div>
  );

};

export default CreateNew;