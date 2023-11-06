import React from 'react';
import { ReactComponent as Add } from './../../../../../icon/add.svg';
import { ReactComponent as Minus } from './../../../../../icon/minus.svg';

function CountButton({ quantity, plusOne, minusOne }) {
  return (
    <div className="count-btn-wrap">
      <span
        className={
          quantity === 1
            ? 'count-btn icon not_canClick'
            : 'count-btn icon canClick'
        }
        role="button"
        onClick={minusOne}
      >
        <Minus className="Counts_SVG" />
      </span>
      <div className="count-num">
        <p>{quantity}</p>
      </div>
      <span className="count-btn icon" role="button" onClick={plusOne}>
        <Add className="Counts_SVG" />
      </span>
    </div>
  );
}

export default CountButton;
