import React from 'react';
import { useContext } from 'react';
import '../global.scss';
import './NavBar.scss';
import { NavLink, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Logo from '../icon/logo/logo.svg';
import SearchIcon from '../icon/search.svg';
import { userImg } from '../config';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../pages/member/context/AuthContext';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchBar from '../pages/product/food/SearchBar';
import CartIcon from './CartIcon';
import proSetImg from '../pages/member/prosetImg.png';

import { useAllContext } from '../pages/AllContext/AllContext';
function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { myAuth, logout } = useContext(AuthContext);
  const { searchWord, setSearchWord } = useAllContext();
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={Logo} alt="logo" width="160" height="33" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/site">
                  景點
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/food">
                  美食
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/stays">
                  住宿
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ticket">
                  票卷
                </NavLink>
              </li>
            </ul>

            <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />

            <div>
              {myAuth.authorised ? (
                <div className="d-flex navbarUserPic">
                  <div
                    className="userIcon"
                    style={
                      myAuth.member_img !== null
                        ? {
                            backgroundImage: `url(${userImg}${myAuth.member_img})`,
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                          }
                        : {
                            //預設照片
                            backgroundImage: `url(${proSetImg}) `,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                          }
                    }
                  ></div>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="nav-link login-user-text"
                      variant="success"
                      id="dropdown-basic"
                    >
                      {myAuth.email}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="dropdown-user-item"
                        // href="/profile"
                        onClick={() => {
                          navigate('/profile');
                        }}
                      >
                        修改個人資料
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-user-item"
                        // href="/reset_password"
                        onClick={() => {
                          navigate('/reset_password');
                        }}
                      >
                        重設密碼
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-user-item"
                        // href="/orders"
                        onClick={() => {
                          navigate('/orders');
                        }}
                      >
                        訂單記錄
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-user-item"
                        // href="/itinerary"
                        onClick={() => {
                          navigate('/itinerary');
                        }}
                      >
                        我的行程規劃
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-user-item"
                        // href="/ticket_qrcode"
                        onClick={() => {
                          navigate('/ticket_qrcode');
                        }}
                      >
                        我的票夾
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-user-item"
                        // href="/comment"
                        onClick={() => {
                          navigate('/comment');
                        }}
                      >
                        我的評論
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-user-item"
                        // href="/collect"
                        onClick={() => {
                          navigate('/collect');
                        }}
                      >
                        我的收藏
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-user-item"
                        href="#/"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                      >
                        登出
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <>
                  <NavLink className="nav-link" to="/logIn">
                    <button type="button" className="btn login-btn-text">
                      登入
                    </button>
                  </NavLink>
                  <NavLink className="signin-m" to="/signIn">
                    <Button
                      className="signin-btn"
                      variant="primary"
                      type="button"
                    >
                      註冊
                    </Button>
                  </NavLink>
                </>
              )}
            </div>
            <div className="cart icon">{<CartIcon />}</div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
