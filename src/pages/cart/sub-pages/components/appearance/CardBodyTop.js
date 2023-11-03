import React from 'react';
import Pic from './../../../../../img/stay_home.jpg';
import { Rate } from 'antd';
function CardBodyTop({ productName, rate, img }) {
  return (
    <div className="d-flex align-items-center">
      <div className="pic-wrap">
        <img alt="pic" src={img ? img : Pic} />
      </div>
      <div className="card-body-top-text">
        <p>{productName}</p>
        <div className="score-wrap d-flex">
          <Rate
            disabled
            value={rate}
            className="TimeTravel_Rate"
            style={{ zIndex: '-1' }}
          />
          <div className="rate_text">
            <p>{isNaN(rate) ? '目前沒有評價' : `${rate}顆星`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBodyTop;
