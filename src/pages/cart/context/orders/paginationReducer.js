const setTotalPage = (state, action) => {
  const result = {
    ...state,
    totalItems: action.payload.items,
    totalPages: action.payload.totalPages,
    itemsPerPage: action.payload.itemsPerPage,
    showItems: action.payload.items.slice(0, action.payload.itemsPerPage),
    loading: action.payload.loading,
  };
  return result;
};

const setPage = (state, action) => {
  const result = {
    ...state,
    nowPage: action.payload,
    showItems: state.totalItems.slice(
      (action.payload - 1) * state.itemsPerPage,
      action.payload * state.itemsPerPage
    ),
  };
  return result;
};

export function PaginationReducer(state, action) {
  switch (action.type) {
    case 'SET_TOTAL_PAGE':
      return setTotalPage(state, action);

    case 'SET_PAGE':
      return setPage(state, action);

    default:
      return;
  }
}
