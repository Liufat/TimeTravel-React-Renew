import { useEffect, useReducer } from 'react';
import { PaginationReducer } from './paginationReducer';
import buildPaginationInfo from '../../hooks/buildPageInfo';

const usePagination = (ordersData, itemsPerPage) => {
  const initialState = {
    nowPage: 1,
    showItems: ordersData.slice(0, itemsPerPage),
  };

  const [pages, dispatch] = useReducer(PaginationReducer, initialState);

  useEffect(() => {
    const pageInfo = buildPaginationInfo(ordersData, itemsPerPage);
    dispatch({
      type: 'SET_TOTAL_PAGE',
      payload: { ...pageInfo },
    });
  }, [ordersData, itemsPerPage]);

  const prePage = () => {
    if (pages.nowPage > 1) {
      dispatch({ type: 'SET_PAGE', payload: pages.nowPage - 1 });
    }
    return;
  };

  const nextPage = () => {
    if (pages.nowPage < pages.totalPages) {
      dispatch({ type: 'SET_PAGE', payload: pages.nowPage + 1 });
    }
    return;
  };

  const setPage = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  return { pages, prePage, nextPage, setPage };
};
export default usePagination;
