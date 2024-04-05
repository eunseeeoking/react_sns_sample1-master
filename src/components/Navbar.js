import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap'
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';


//아이콘들
import { PiHeartStraightLight } from "react-icons/pi"; //빈하트
import { PiHeartStraightFill } from "react-icons/pi"; //채운하트
import { RiHomeSmileLine } from "react-icons/ri"; //빈집
import { RiHomeSmileFill } from "react-icons/ri"; //채운집
import { BsSearchHeart, BsSearchHeartFill } from "react-icons/bs";
import { IoCreateOutline, IoCreateSharp } from "react-icons/io5";
import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
//여기까지











function Navbar({ onLogin }) {
    const location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div>
                🅼🆈 🆂🅽🆂
            </div>
            <div>
                <ul className="navbar-nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home" onClick={onLogin}>{location.pathname === "/home" ? <RiHomeSmileFill /> : <RiHomeSmileLine />} 홈</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile" onClick={onLogin}>프로필</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/search" onClick={onLogin}>{location.pathname === "/search" ? <BsSearchHeartFill /> : <BsSearchHeart />}검색</Link>
                    </li>
                    {/* <li className="nav-item">
                    <Link className="nav-link" to="/">로그인</Link>
                </li> */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={onLogin}> {location.pathname === "/" ? <PiHeartStraightFill /> : <PiHeartStraightLight />} 탐색</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/write" onClick={onLogin}>{location.pathname === "/write" ? <IoCreateSharp /> : <IoCreateOutline />}글쓰기</Link>
                    </li>
                    <li className="nav-item">

                        <Link className="nav-link" to="/msg" onClick={onLogin}>{location.pathname === "/msg" ? <AiFillMessage /> : <AiOutlineMessage />}메시지</Link>
                    </li>
                </ul>
            </div>
            <div className="droupBtn" color = "light">

            <DropdownButton title="더보기"  onSelect={(eventKey) => 
                console.log(eventKey)}>
              <Dropdown.Item eventKey="item1">아이템1 test</Dropdown.Item>
              <Dropdown.Item eventKey="item2">아이템2</Dropdown.Item>
              <Dropdown.Item eventKey="item3">아이템3</Dropdown.Item>
           </DropdownButton>
          
            </div>
        </nav>
    );
}

export default Navbar;
