import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ eventHandler, text }) => {
  return (
    <div>
      <button onClick={eventHandler}>{text}</button>
    </div>
  )
}

const DisplayAnecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const getRandomAnecdote = () => {
    const randomNum = Math.floor((Math.random() * (anecdotes.length - 1)) + 0);
    setSelected(randomNum);
  }

  // Make array of n elements: source https://stackoverflow.com/a/37377279
  const [votes, setVotes] = useState(Array.from(Array(anecdotes.length), () => 0));
  const voteAnecdote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes)
  }

  const randomAnecdote = anecdotes[selected];
  const anecdoteVotes = votes[selected];
  const mostVotes = Math.max(...votes);
  const mostVoted = anecdotes[votes.indexOf(mostVotes)];

  return (
    <div>
      <Title text='Anecdote of the day'/>
      <DisplayAnecdote anecdote={randomAnecdote} votes={anecdoteVotes}/>
      <Button eventHandler={voteAnecdote} text='vote'/>
      <Button eventHandler={getRandomAnecdote} text='next anecdote'/>
      <Title text='Anecdote with most votes'/>
      <DisplayAnecdote anecdote={mostVoted} votes={mostVotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes}/>
  </React.StrictMode>,
  document.getElementById('root')
);
