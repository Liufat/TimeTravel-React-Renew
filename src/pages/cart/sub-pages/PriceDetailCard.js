import React from 'react';
import StateButton from './components/StateButton';
function PriceDetailCard({ title, items, total }) {
  return (
    <>
      <div className="p-d-c-body">
        <div className="card-body">
          <h2>價格明細</h2>
        </div>
        <div className="card-body pt-0 pb-3 px-5">
          <p className="p-d-c-p">{title}</p>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <h2>{`您的${title}購物車是空的喔`}</h2>
          </div>
        ) : (
          <div>
            {items.map((v, i) => {
              return (
                <div key={v.name}>
                  <div className="d-flex justify-content-evenly">
                    <p>{v.name}</p>
                    <p>{`$${v.price}`}</p>
                    <p>{`X${v.quantity}`}</p>
                    {v.checkin || v.checkout ? (
                      <p>{`X${
                        (+new Date(v.checkout) - +new Date(v.checkin)) /
                        86400000
                      }晚`}</p>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="btn-wrap">
                    <StateButton text={v.chozenType} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="card-wrap">
        <div className="card-body pt-1 pb-5 d-flex justify-content-between">
          <p className="p-d-c-c-p">小記</p>
          <p className="total">{total}</p>
        </div>
      </div>
    </>
  );
}

export default PriceDetailCard;
