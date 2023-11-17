import React, { useEffect, useReducer } from 'react';
import OrdersAccordionUndone from './OrdersAccordionUndone';
import moment from 'moment';
import { PaginationReducer } from '../../context/orders/paginationReducer';
import buildPaginationInfo from '../../hooks/buildPageInfo';
import Pagination from './Pagination';
import usePagination from '../../context/orders/usePagination';
function OrdersUndone({ ordersData }) {
  // console.log(newOrder);
  // const initialState = {
  //   nowPage: 1,
  //   totalItems: [],
  //   showItems: [],
  // };

  const itemsPerPage = 5;
  const { pages, prePage, nextPage, setPage } = usePagination(
    ordersData,
    itemsPerPage
  );

  // const [pages, dispatch] = useReducer(PaginationReducer, initialState);

  // useEffect(() => {
  //   const pageInfo = buildPaginationInfo(ordersData, itemsPerPage);
  //   dispatch({ type: 'SET_TOTAL_PAGE', payload: pageInfo });
  // }, [ordersData]);

  // const prePage = () => {
  //   if (pages.nowPage > 1) {
  //     dispatch({ type: 'SET_PAGE', payload: pages.nowPage - 1 });
  //   }
  //   return;
  // };

  // const nextPage = () => {
  //   if (pages.nowPage < pages.totalPages) {
  //     dispatch({ type: 'SET_PAGE', payload: pages.nowPage + 1 });
  //   }
  //   return;
  // };

  // const setPage = (page) => {
  //   dispatch({ type: 'SET_PAGE', payload: page });
  // };

  return (
    <>
      <div className="orders-details-wrap row">
        <ul className="orders-details-ul">
          <li className="col text-center">
            <p>訂單成立日期</p>
          </li>
          <li className="col text-center">
            <p>訂單編號</p>
          </li>
          <li className="col text-center">
            <p>訂單總價</p>
          </li>
          <li className="col text-center">
            <p>訂單狀態</p>
          </li>
        </ul>
        {ordersData.length === 0 ? (
          <div className="d-flex justify-content-center">
            <h1>您目前沒有未結帳的訂單喔！</h1>
          </div>
        ) : (
          pages.showItems.map((v, i) => {
            const { orders_created_time, uuid, orders_total_price } = v;
            const createdTime = moment(new Date(orders_created_time)).format(
              'YYYY-MM-DD'
            );
            return (
              <div key={v.uuid} className={'mb-3'}>
                <OrdersAccordionUndone
                  createdTime={createdTime}
                  uuid={uuid}
                  totalPrice={orders_total_price}
                />
              </div>
            );
          })
        )}
      </div>
      <Pagination
        pageNow={pages.nowPage}
        pageTotal={pages.totalPages}
        prePage={prePage}
        nextPage={nextPage}
        setPage={setPage}
      />
    </>
  );
}

export default OrdersUndone;
