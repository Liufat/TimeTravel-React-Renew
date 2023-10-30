import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { LINE_PAY_CONFIRM_API } from '../../../config';

function LinepayConfirm() {
  const query = queryString.parse(useLocation().search);

  const checkPay = async () => {
    const result = await axios.post(LINE_PAY_CONFIRM_API, query);
    if (result.data === 'success') {
      window.location = 'http://localhost:3000/cart/success';
    } else {
      window.location = 'http://localhost:3000/cart/fail';
    }
  };

  checkPay();

  //   console.log(query);

  return;
}

export default LinepayConfirm;
