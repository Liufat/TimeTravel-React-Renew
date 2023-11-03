import React, { useState } from 'react';
import { useCart } from '../../../../AllContext/allUseContext';

function DateInput({ text, date, targetItem, dateProps, min, max }) {
  const [newDate, setNewDate] = useState(date);
  const { updateItem } = useCart();

  return (
    <div className="me-3">
      <p>{text}</p>
      <input
        className="input form-control"
        min={min}
        max={max}
        type={'date'}
        value={newDate}
        onChange={(e) => {
          const newDate = e.target.value;
          setNewDate(newDate);
          const changingTarget = { [dateProps]: newDate };
          updateItem({ targetItem, changingTarget });
        }}
      ></input>
    </div>
  );
}

export default DateInput;
