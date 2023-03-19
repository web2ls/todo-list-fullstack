const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload.todos, total: Number(action.payload.count) };

    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(x => x.id !== action.payload) };

    case 'COMPLETE_TODO':
      const completedId = action.payload;
      const updatedTodos = state.todos.map(x => {
        if (x.id === completedId) {
          return { ...x, complete: true };
        } else {
          return x;
        }
      })
      return { ...state, todos: updatedTodos };

    case 'CHANGE_SORTING':
      return { ...state, sortBy: action.payload };

    case 'CHANGE_DIRECTION':
      return { ...state, direction: action.payload };

    case 'SET_PAGE':
      return { ...state, page: action.payload };

    case 'SET_ADMIN':
      return { ...state, isAdmin: action.payload };

    default:
      return state;
  }
}

export default reducer;