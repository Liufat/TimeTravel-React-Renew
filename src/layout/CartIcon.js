import React, { useContext } from 'react';
import CartImg from '../icon/cart.svg';
import { NavLink } from 'react-router-dom';
import AuthContext from '../pages/member/context/AuthContext';
import Swal from 'sweetalert2';
// import {
//   useHotelCart,
//   useTicketCart,
//   useFoodCart,
// } from '../pages/cart/utils/useCart';
import { useCart } from '../pages/cart/utils/useCart';

function CartIcon() {
  const { myAuth } = useContext(AuthContext);
  // const foodcart = useFoodCart().cart;
  // const hotelcart = useHotelCart().cart;
  // const ticketcart = useTicketCart().cart;
  // console.log(myAuth);

  const cartTotalItems = useCart().cart.totalItems;

  const myLogIn = () => {
    if (localStorage.getItem('auth') === null) {
      return Swal.fire({
        title: '請先登入',
        confirmButtonText: '立即登入',
        confirmButtonColor: '#59d8a1',
        showCancelButton: true,
        cancelButtonText: '返回頁面',
        cancelButtonColor: '#D9D9D9',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = '/logIn';
        }
      });
    }
  };
  return (
    <>
      {myAuth.authorised ? (
        <NavLink className="nav-link" to="/cart">
          <img src={CartImg} alt="" />
          <div className="cart-count">
            <span>{cartTotalItems}</span>
          </div>
        </NavLink>
      ) : (
        <div className="nav-link" role="button" onClick={myLogIn}>
          <img src={CartImg} alt="" />
          <div className="cart-count">
            <span>{cartTotalItems}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default CartIcon;
