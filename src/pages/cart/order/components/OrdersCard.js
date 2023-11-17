import React, { useEffect, useReducer, useState } from 'react';
import OrdersAccordion from './OrdersAccordion';
import moment from 'moment';
import Pagination from './Pagination';
// import { PaginationReducer } from '../../context/orders/paginationReducer';
// import buildPaginationInfo from '../../hooks/buildPageInfo';
import usePagination from '../../context/orders/usePagination';
function OrdersCard({ ordersData, memberSid, loading }) {
  const itemsPerPage = 5;
  // const initialState = {
  //   nowPage: 1,
  //   showItems: ordersData.slice(0, itemsPerPage),
  // };

  const { pages, prePage, nextPage, setPage } = usePagination(
    ordersData,
    itemsPerPage
  );

  // const [pages, dispatch] = useReducer(PaginationReducer, initialState);

  // useEffect(() => {
  //   const pageInfo = buildPaginationInfo(ordersData, itemsPerPage);
  //   dispatch({
  //     type: 'SET_TOTAL_PAGE',
  //     payload: { ...pageInfo },
  //   });
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

  const buildDom = () => {
    return (
      <>
        {ordersData.length === 0 ? (
          <div className="d-flex justify-content-center">
            <h1>您目前沒有已完成的訂單喔，快到Time Travel裡逛逛吧！</h1>
          </div>
        ) : (
          pages.showItems.map((v, i) => {
            const { orders_created_time, uuid, orders_total_price } = v;
            const createdTime = moment(new Date(orders_created_time)).format(
              'YYYY-MM-DD'
            );
            return (
              <div key={v.uuid} className={'mb-3'}>
                <OrdersAccordion
                  createdTime={createdTime}
                  uuid={uuid}
                  totalPrice={orders_total_price}
                  memberSid={memberSid}
                />
              </div>
            );
          })
        )}
      </>
    );
  };

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
        </ul>

        {loading === true ? (
          <div className="d-flex justify-content-center">
            <h1>Loading......</h1>
          </div>
        ) : (
          buildDom()
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

export default OrdersCard;
