import React, { useState } from 'react';
import OrdersTypesList from './components/OrdersTypesList';
import './OrdersDetails.scss';
import OrdersCard from './components/OrdersCard';
import OrdersHistory from './components/OrdersHistory';
import OrdersUndone from './components/OrdersUndone';
function OrdersDetail({ ordersData, memberSid }) {
  // console.log(memberSid);
  const nowOrder = ordersData.filter((v, i) => {
    return (
      v.orders_status_sid === 1 &&
      +new Date() - +new Date(v.orders_created_time) < 2592000000
    );
  });
  const undoneOrder = ordersData.filter((v, i) => {
    return v.orders_status_sid === 2;
  });
  const historyOrder = ordersData.filter((v, i) => {
    return (
      v.orders_status_sid === 1 &&
      +new Date() - +new Date(v.orders_created_time) >= 2592000000
    );
  });
  // console.log(historyOrder);
  const [path, setPath] = useState('now');
  // console.log(ordersData);
  return (
    <div className="container">
      <OrdersTypesList path={path} setPath={setPath} />
      {path === 'now' ? (
        <OrdersCard ordersData={nowOrder} memberSid={memberSid} />
      ) : (
        ''
      )}
      {path === 'undone' ? (
        <OrdersUndone ordersData={undoneOrder} memberSid={memberSid} />
      ) : (
        ''
      )}
      {path === 'history' ? (
        <OrdersHistory ordersData={historyOrder} memberSid={memberSid} />
      ) : (
        ''
      )}
    </div>
  );
}

export default OrdersDetail;
