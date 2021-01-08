import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { removeNotification, setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes;
    }
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase()
        .includes(filter.toLowerCase())
    );
  });

  const sortedAnecdotes = [...anecdotes].sort((a, b) => {
    return a.votes - b.votes;
  }).reverse();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`YOU VOTED FOR ${anecdote.content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;