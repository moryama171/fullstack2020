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
    });
  };
};

export const voteAnecdote = (anecdoteId, updatedAnecdote) => {
  return async (dispatch) => {
    await anecdotesService
      .updateAnecdote(anecdoteId, updatedAnecdote);
    dispatch({
      type: 'ADD_VOTE',
      data: {
        id: anecdoteId,
        anecdote: updatedAnecdote
      }
    });
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'ADD_VOTE':
      const id = action.data.id;
      const updatedAnecdote = action.data.anecdote;
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    default:
      return state;
  }
};

export default reducer;