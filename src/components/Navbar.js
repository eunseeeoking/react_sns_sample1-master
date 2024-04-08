import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../123.png';
import Post from '../components/UserList';


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
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isWriteOpen, setWriteOpen] = useState(false);
   
    const [isNextBtn, setisNextBtn] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    // 파일 드래그 이벤트 핸들러
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 파일 드롭 이벤트 핸들러
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(URL.createObjectURL(file));
            // 파일 업로드 로직을 추가할 수 있습니다.
            console.log(URL.createObjectURL(file));
        } else {
            alert('이미지 파일을 업로드해주세요.');
        }
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        document.getElementById("userId").value = "";
        SearchUser();
    };
    const toggleWrite = () => {
        setWriteOpen(!isWriteOpen);
        setSelectedImage(null);
    }
    function nextBtn(){
        setisNextBtn(true);
    }
    function backBtn(){
        setisNextBtn(false);
        if(isNextBtn==false && selectedImage!=null){
            setSelectedImage(null);
        }
    }
    useEffect(() => {
        if (isWriteOpen) {
            document.body.style.overflow = 'hidden';
        } else {

            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isWriteOpen]);

    const [UserList, setUserList] = useState([]);
    async function SearchUser() {
        onLogin();
        var userId = document.getElementById("userId").value;
        if (userId != "") {
            try {

                const response = await fetch(`http://localhost:4000/SearchUserList.dox?userId=${userId}`);
                const jsonData = await response.json();

                setUserList(jsonData);
            } catch (error) {
                console.error("에러!");
            }
        } else {
            setUserList([]);
        }


    }




    const location = useLocation();
    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light fixed-top ${isSearchOpen ? 'NavHidden' : 'NavVisible'}`}>
            <div>
                🅼🆈 🆂🅽🆂
            </div>
            <div>
                <ul className="navbar-nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home" onClick={onLogin}>{location.pathname === "/home" ? <RiHomeSmileFill /> : <RiHomeSmileLine />}{isSearchOpen == false ? '홈' : ''}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/profile/${sessionStorage.getItem("userId")}`} onClick={onLogin}>{isSearchOpen == false ? '프로필' : '★'}</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={toggleSearch}>{isSearchOpen === true ? <BsSearchHeartFill /> : <BsSearchHeart />}{isSearchOpen == false ? '검색' : ''}</a>

                        <div className={`navSearch ${isSearchOpen ? 'SearchVisible' : 'SearchHidden'}`}>
                            <div className="SearchbarHeader">
                                <h1>검색</h1>
                                <input placeholder="검색" id="userId" onChange={SearchUser}></input>
                            </div>
                            <div>
                                {UserList.map(post => (
                                    <Post key={post.USERID} name={post.USERNAME} userId={post.USERID} />
                                ))}

                            </div>
                        </div>

                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="issue" onClick={onLogin}> {location.pathname === "/issue" ? <PiHeartStraightFill /> : <PiHeartStraightLight />}{isSearchOpen == false ? '탐색' : ''} </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={toggleWrite}>
                            {isWriteOpen === true ? <IoCreateSharp /> : <IoCreateOutline />}
                            {isSearchOpen === false ? '글쓰기' : ''}
                        </a>
                        <div className={`${isWriteOpen ? 'WriteModal' : 'WriteModalHidden'}`} onClick={toggleWrite}>
                            <a>X</a>
                        </div>
                        <div className={`${isWriteOpen ? 'WriteBoxVisible drop-area' : 'WriteBoxHidden'}`} onDragOver={handleDragOver} onDrop={handleDrop} onClick={(e) => e.stopPropagation()}>
                            {selectedImage ? (
                               <div className="">
                                    <div className="nextBar">
                                    <a className="backBtn" onClick={backBtn}> ← </a>
                                    <a className="NextBtn" onClick={nextBtn}>{isNextBtn == false ? '다음' : '작성완료'}</a>
                                    </div>
                                <img src={selectedImage} alt="Uploaded" style={{ width: '800px', height: '800px' }}></img>
                                <div className={`${isNextBtn ? 'WriteBoxContentsVisible' : 'WriteBoxContentsHidden'}`}>
                                    새 게시물 만들기
                                </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="ImgWaitBar"> 새 게시물 만들기</div>
                                    <p>
                                     <img src={logo}/><br/>
                                    이곳에 사진을 끌어다 놓으세요
                                    </p>
                                    </div>
                            )}
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/msg" onClick={onLogin}>{location.pathname === "/msg" ? <AiFillMessage /> : <AiOutlineMessage />}{isSearchOpen == false ? '메시지' : ''}</Link>
                    </li>
                </ul>
            </div>

            <div className="droupBtn">
                <DropdownButton title={isSearchOpen == false ? '더보기' : 'ㅁ'} className={isSearchOpen == false ? 'dropdownVisible' : 'dropdownHidden'} onSelect={(eventKey) =>
                    window.location.href = eventKey}>
                    <Dropdown.Item eventKey="item1">아이템1</Dropdown.Item>
                    <Dropdown.Item eventKey="item2">아이템2</Dropdown.Item>
                    <Dropdown.Item eventKey="/">로그아웃</Dropdown.Item>
                </DropdownButton>

            </div>


        </nav>

    );
}

export default Navbar;
