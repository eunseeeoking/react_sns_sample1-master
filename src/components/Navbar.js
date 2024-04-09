import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../123.png';
import Post from '../components/UserList';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const TypeChange = async ()=>{
        await fetch(selectedImage)
        .then(response => response.blob())
        .then(blobData => {
          // blobData를 사용하여 원하는 작업을 수행
          console.log("이거 언제 찍히는거지?" , blobData);
          selectedImage=blobData;
          
        })
        .catch(error => {
          console.error('Error fetching blob data:', error);
        });
    }
    const submitWrite = async () => {
    
        const content = document.getElementById("content").value;
   
    
        try {
            const formData = {};
            formData.image = selectedImage;
            formData.content = content;
            formData.userId = sessionStorage.userId;

            console.log("formData ==>",formData);
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2);
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
    
            const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
            let files = [];
            for (const file of selectedImage) {
                const fileName = `${timestamp}_${file.name}`; // 저장되는 순간의 시간(YYMMDDHHmmss)을 파일 이름과 같이 저장     
                files.push({fileName : fileName, fileOrgName : file.name});   
                const imgformData = new FormData();
                imgformData.append('file', file, fileName); 
                try {
                    const response = await fetch('http://localhost:4000/upload', {
                        method: 'POST',
                        body: imgformData
                    });
                    
                    if (!response.ok) {
                        throw new Error('이미지 업로드에 실패했습니다.');
                    }
            
                    const responseData = await response.json();
                    alert(responseData); // 업로드 결과 출력
                } catch (error) {
                    console.error('이미지 업로드 오류:', error.message);
                    // 오류 처리
                }
            }
            formData.files = files;
            const response = await fetch(`http://localhost:4000/snsWriteBoard.dox`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const jsonData = await response.json();
            console.log("formData===>>>", formData);
            alert(jsonData.message);
            navigate('/'); // 작성 후에 홈 화면으로 이동
        } catch (error) {
            console.error("Error:", error);
        }
    };








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
    async function nextBtn(){
        if(isNextBtn == true){
            console.log(document.getElementById("content").value);
            console.log(selectedImage);
          await TypeChange()
           submitWrite()
        }else{
            setisNextBtn(true);
        }
       
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
                                    <div className={`${!isNextBtn ? 'nextBar' : 'endBar'}`}>
                                    <a className="backBtn" onClick={backBtn}> ← </a>
                                    <a className="NextBtn" onClick={nextBtn}>{isNextBtn == false ? '다음' : ''}</a>
                                    </div>
                                <img src={selectedImage} alt="Uploaded" style={{ width: '800px', height: '800px' }}></img>
                                <div className={`${isNextBtn ? 'WriteBoxContentsVisible' : 'WriteBoxContentsHidden'}`}>
                                        <div className="WriteContentsBox_header">
                                        <a className="NextBtn" onClick={nextBtn}>{isNextBtn == true ? '작성완료' : ''}</a>
                                        </div>
                                        <div className="WriteContentsBox_body">
                                            {sessionStorage.userId}
                                            <textarea rows="15"  placeholder="문구를 입력하세요..." id="content"></textarea>
                                      
                                    </div>
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
