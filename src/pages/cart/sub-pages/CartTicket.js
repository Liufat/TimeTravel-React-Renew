import React from 'react';
import CardHeader from './components/CardHeader';
import TicketCard from './components/TicketCard';
import PriceDetail from './PriceDetail';
import { useCart } from '../utils/useCart';
import itemsType from '../hooks/itemsType';
function CartTicket({ prev, next, step, maxSteps }) {
  const { items } = useCart().cart;
  const ticketItems = itemsType(items, 'ticket');
  if (ticketItems.length !== 0) {
    return (
      <div className="container">
        <div className="row">
          <CardHeader text={'票券資訊'} />
          <div className="d-flex justify-content-between">
            <div className="col-lg-7">
              <TicketCard items={ticketItems} />
            </div>
            <div className="col-lg-4">
              <PriceDetail
                prev={prev}
                next={next}
                step={step}
                maxSteps={maxSteps}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <CardHeader text={'票券資訊'} />
          <div className="d-flex justify-content-between">
            <div className="col-lg-7">
              <div className="empty-cart">
                <h1>您的票券購物車是空的喔！</h1>
              </div>
            </div>
            <div className="col-lg-4">
              <PriceDetail
                prev={prev}
                next={next}
                step={step}
                maxSteps={maxSteps}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartTicket;
