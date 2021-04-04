import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';


const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const newAnecdote = {
      content: event.target.anecdote.value,
      votes: 0
    };
    event.target.anecdote.value = '';
    props.createAnecdote(newAnecdote);
    props.setNotification('New note added', 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default connect(
  null,
  {
    createAnecdote,
    setNotification
  }
)(AnecdoteForm);