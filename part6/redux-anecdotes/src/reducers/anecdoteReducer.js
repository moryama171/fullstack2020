const getId = () => (100000 * Math.random()).toFixed(0);

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  };
};

export const createAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  };
};

export const voteAnecdote = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'ADD_VOTE':
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    default:
      return state;
  }
};

export default reducer;