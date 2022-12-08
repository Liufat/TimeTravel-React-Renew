import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import {
  ITINERARY_DELITEM,
  ITINERARY_ADDITEM,
  ITINERARY_EDITLIST,
} from './site-config';
import { useItineraryContext } from './ItineraryContext';

export default function ITitleBtns() {
  const { iData, setIData, name, setName, day, setDay, date, setDate } =
    useItineraryContext();
  const location = useLocation();
  const listNumber = location.pathname.split('/')[2];
  const mySubmit = async () => {
    console.log(name);
    console.log(day);
    console.log(date);
    // const { del } = await axios.delete(ITINERARY_DELITEM + listNumber, {
    //   list_number: listNumber,
    // });
    // console.log({ del });
    // console.log(iData);
    // console.log(iData[0]);
    // for (let i = 0; i < iData.length; i++) {
    //   const { add } = await axios.post(ITINERARY_ADDITEM, iData[i]);
    //   // console.log({ add });
    // }
    // const { edit } = await axios.put(ITINERARY_EDITLIST + listNumber, {
    //   list_name: name,
    //   day: day,
    //   date: date,
    // });
    Swal.fire({
      icon: 'success',
      title: '已儲存',
    });
  };
  return (
    <div id="iTitleBtns">
      <button type="button" className="btn btn-secondary" onClick={mySubmit}>
        儲存行程
      </button>
      <button type="button" className="btn btn-primary">
        加入購物車
      </button>
    </div>
  );
}
