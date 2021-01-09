import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';


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

  const voteAnecdote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(setNotification(`You voted: ${anecdote.content}`, 5));
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
            <button onClick={() => voteAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;