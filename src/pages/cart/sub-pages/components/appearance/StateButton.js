import React from 'react';

function StateButton({ text }) {
  return (
    <div
      className={
        text !== undefined ? 'state-button-wrap' : 'state-button-wrap-none'
      }
    >
      <p>{text}</p>
    </div>
  );
}

export default StateButton;
