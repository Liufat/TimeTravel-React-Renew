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
import { useCart } from '../pages/AllContext/allUseContext';

function CartIcon() {
  const { myAuth } = useContext(AuthContext);

  const cartTotalItems = useCart().cart.totalItems;
  const { cart } = useCart();

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

  const genCartIcon = (type, click) => {
    if (type === 'stop') {
      return (
        <div className="nav-link" role="button" onClick={click}>
          <img src={CartImg} alt="shopping-cart" />
          <div className="cart-count">
            <span>{cartTotalItems}</span>
          </div>
        </div>
      );
    }
    if (type === 'link') {
      return (
        <NavLink className="nav-link" to={click}>
          <img src={CartImg} alt="shopping-cart" />
          <div className="cart-count">
            <span>{cartTotalItems}</span>
          </div>
        </NavLink>
      );
    }
  };

  const checkCartItems = () => {
    const cartItemsQuantity = cart.items.length;
    const alarm = () => {
      return Swal.fire({
        title: '您的購物車是空的喔\n快到TimeTravel逛逛吧',
        confirmButtonText: '確認',
        confirmButtonColor: '#59d8a1',
      });
    };
    if (!myAuth.authorised) {
      return genCartIcon('stop', myLogIn);
    }

    if (cartItemsQuantity === 0) {
      return genCartIcon('stop', alarm);
    } else {
      return genCartIcon('link', '/cart');
    }
  };

  return <>{checkCartItems()}</>;
}

export default CartIcon;
