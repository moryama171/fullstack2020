import anecdotesService from '../services/anecdotes';


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export const createAnecdote = (newAnecdote) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService
      .createAnecdote(newAnecdote);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
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