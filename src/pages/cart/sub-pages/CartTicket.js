import React, { useEffect } from 'react';
import CardHeader from './components/appearance/CardHeader';
import TicketCard from './components/ticket-card/TicketCard';
import PriceDetail from './PriceDetail';
import { useCart } from '../../AllContext/allUseContext';
import itemsType from '../hooks/itemsType';
function CartTicket() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { items } = useCart().cart;
  const ticketItems = itemsType(items, 'ticket');
  if (ticketItems.length !== 0) {
    return (
      <>
        <CardHeader text={'票券資訊'} />
        <div className="d-flex justify-content-between">
          <div className="col-lg-7">
            <TicketCard items={ticketItems} />
          </div>
          <div className="col-lg-4">
            <PriceDetail />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <CardHeader text={'票券資訊'} />
        <div className="d-flex justify-content-between">
          <div className="col-lg-7">
            <div className="empty-cart">
              <h1>您的票券購物車是空的喔！</h1>
            </div>
          </div>
          <div className="col-lg-4">
            <PriceDetail />
          </div>
        </div>
      </>
    );
  }
}

export default CartTicket;
