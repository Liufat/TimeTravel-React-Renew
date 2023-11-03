import React from 'react';
import CardTitle from '../appearance/CardTitle';
import CardBodyTop from '../appearance/CardBodyTop';
import StateButton from '../appearance/StateButton';
import DateInput from '../function-components/DateInput';
import CountButton from '../function-components/CountButton';
import { useCart } from '../../../../AllContext/allUseContext';
import moment from 'moment';
function TicketCard({ items }) {
  const { plusOne, minusOne, removeItem } = useCart();

  const toDay = moment(new Date()).format('YYYY-MM-DD');
  return (
    <>
      {items.map((v, i) => {
        return (
          <div className="card-wrap pb-5" key={v.name}>
            <div className="card-body">
              <CardTitle
                text={'票券預定資訊'}
                deleteFun={() => {
                  removeItem(v);
                }}
              />
              <CardBodyTop productName={v.name} img={v.img} rate={v.rate} />
              <StateButton text={v.chozenType} />
              <div className="d-flex justify-content-between">
                <DateInput
                  text={'使用日期'}
                  min={toDay}
                  targetItem={v}
                  date={v.startDate}
                  id={v.id}
                  dateProps={'startDate'}
                />
                <CountButton
                  quantity={v.quantity}
                  plusOne={() => {
                    plusOne(v);
                  }}
                  minusOne={() => {
                    minusOne(v);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TicketCard;
