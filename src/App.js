import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

// 版面頁面元件
import Layout from './layout/Layout';
// 以下為各頁面元件
import Home from './pages/Home/Home';
import HomeJie from './pages/HomeJie/HomeJie';
import ProductList from './pages/product/ProductList';
import Itinerary from './pages/product/itinerary/Itinerary';
import Site from './pages/product/itinerary/Site';
import SiteDetail from './pages/product/itinerary/Site-detail';
import Food from './pages/product/food/Food';
import FoodDetail from './pages/product/food/FoodDetail';
import Stays from './pages/product/stays/Stays';
import Ticket from './pages/product/ticket/Ticket';
import TicketDetail from './pages/product/ticket/TicketDetail';
import LogIn from './pages/member/LogIn';
import Profile from './pages/member/Profile';
import SignIn from './pages/member/SignIn';
import ForgetPassword from './pages/member/ForgetPassword';
import ResetPassword from './pages/member/ResetPassword';
import TicketQRcode from './pages/member/TicketQRcode';
import Comment from './pages/member/Comment';
import Collect from './pages/member/Collect';
import Cart from './pages/cart/Cart';
import ItineraryDetail from './pages/product/itinerary/Itinerary-detail';
import Orders from './pages/cart/order/Orders';
import OrderSuccess from './pages/cart/OrderSuccess';
import OrderFail from './pages/cart/OrderFail';

//context
import { HotelContextProvider } from './pages/product/stays/Context/HotelContext';
import { AuthContextProvider } from './pages/member/context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      {/* 路由表 */}
      <HotelContextProvider>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* index代表此路由中的預設子頁 */}
              <Route index element={<Home />} />
              {/* <Route index element={<HomeJie />} /> */}
            </Route>
            <Route path="productList" element={<ProductList />} />
            <Route path="itinerary" element={<Itinerary />} />
            <Route path="itinerary/:sid" element={<ItineraryDetail />} />
            <Route path="site" element={<Site />} />
            <Route path="site/:sid" element={<SiteDetail />} />
            <Route path="food" element={<Food />} />
            <Route path="food/:sid" element={<FoodDetail />} />
            <Route path="stays" element={<Stays />} />
            <Route path="ticket" element={<Ticket />} />
            <Route path="TicketDeatil" element={<TicketDetail />} />
            <Route path="logIn" element={<LogIn />} />
            <Route path="forget_password" element={<ForgetPassword />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reset_password" element={<ResetPassword />} />
            <Route path="ticket_qrcode" element={<TicketQRcode />} />
            <Route path="comment" element={<Comment />} />
            <Route path="collect" element={<Collect />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="cart/success" element={<OrderSuccess />} />
            <Route path="cart/fail" element={<OrderFail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </AuthContextProvider>
      </HotelContextProvider>
    </BrowserRouter>
  );
}

export default App;
