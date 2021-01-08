const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filterString
    default:
      return state
  }
};

export const setFilter = (filterString) => {
  return {
    type: 'SET_FILTER',
    filterString
  }
};

export default filterReducer;