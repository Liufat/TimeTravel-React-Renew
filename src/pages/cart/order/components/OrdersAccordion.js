import React, { useEffect, useState } from 'react';
import SortIcon from './../../../../icon/sort.svg';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';

import AccordionDetail from './AccordionDetail';
import {
  ORDER_DETAILS_FOOD_API,
  ORDER_DETAILS_HOTEL_API,
  ORDER_DETAILS_TICKET_API,
} from '../../../../config';
function OrdersAccordion({ createdTime, uuid, totalPrice, memberSid }) {
  const [foodOrdersData, setFoodOrdersData] = useState([]);
  const [hotelOrdersData, setHotelOrdersData] = useState([]);
  const [ticketOrdersData, setTicketOrdersData] = useState([]);

  async function getFoodOrders() {
    const response = await axios.get(ORDER_DETAILS_FOOD_API(uuid));
    setFoodOrdersData(response.data);
  }
  async function getHotelOrders() {
    const response = await axios.get(ORDER_DETAILS_HOTEL_API(uuid));
    setHotelOrdersData(response.data);
  }
  async function getTicketOrders() {
    const response = await axios.get(ORDER_DETAILS_TICKET_API(uuid));
    setTicketOrdersData(response.data);
  }

  useEffect(() => {
    getFoodOrders();
    getHotelOrders();
    getTicketOrders();
  }, [uuid]);
  // console.log(foodOrdersData);
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item>
        <Accordion.Header>
          <img alt="sort-img" className="sort-img" src={SortIcon} />
          <div className="w-100 m-0 ">
            <ul className="orders-accordion-ul p-0 m-0">
              <li className="col-lg-4 text-center">
                <p>{createdTime}</p>
              </li>
              <li className="col-lg-4 text-center">
                <p>{uuid}</p>
              </li>
              <li className="col-lg-4 text-center">
                <p>{`TWD$${totalPrice}`}</p>
              </li>
            </ul>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <div className="w-100 m-0 ">
            <ul className="orders-accordion-ul p-0 m-0 pb-2">
              <li className="col text-center">
                <p>商品名稱</p>
              </li>
              <li className="col text-center">
                <p>商品單價</p>
              </li>
              <li className="col text-center">
                <p>商品數量</p>
              </li>
              <li className="col text-center">
                <p>小計</p>
              </li>
              <li className="col text-center">
                <p>評價</p>
              </li>
            </ul>
            {foodOrdersData.map((v, i) => {
              return (
                <div key={i}>
                  <AccordionDetail
                    type={'food'}
                    name={v.product_name}
                    price={v.p_selling_price}
                    quantity={v.quantity}
                    totalPrice={v.total_price}
                    commented={v.commented}
                    productNumber={v.product_number}
                    memberSid={memberSid}
                    uuid={uuid}
                  />
                </div>
              );
            })}
            {hotelOrdersData.map((v, i) => {
              return (
                <div key={i}>
                  <AccordionDetail
                    type={'hotel'}
                    name={v.product_name}
                    price={v.room_price}
                    quantity={v.quantity}
                    totalPrice={v.total_price}
                    commented={v.commented}
                    memberSid={memberSid}
                    productNumber={v.product_number}
                    uuid={uuid}
                  />
                </div>
              );
            })}
            {ticketOrdersData.map((v, i) => {
              return (
                <div key={i}>
                  <AccordionDetail
                    type={'ticket'}
                    name={v.product_name}
                    price={v.product_price}
                    quantity={v.quantity}
                    totalPrice={v.total_price}
                    commented={v.commented}
                    productNumber={v.product_number}
                    memberSid={memberSid}
                    uuid={uuid}
                  />
                </div>
              );
            })}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default OrdersAccordion;
