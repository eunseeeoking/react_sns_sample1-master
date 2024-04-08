import React, { useState, useEffect } from 'react';
import ProfilePost from '../components/ProfilePost';
import './Profile.css'; // 프로필 페이지 스타일 import
import { useParams } from 'react-router-dom';

const Profile = ({onLogin}) => {
  var [userInfo, setUserInfo] = useState({USERNAME : "", FOLLOWER : 0, FOLLOWING : 0, posts : 0, profile : "", profileImage : ""});
  const [list, setList] = useState([]); 
  var post = 0;
  let {userId} = useParams();
 
  useEffect(() => {
    async function fetchProfile() {
      onLogin();
      try {
        const response = await fetch(`http://localhost:4000/profile.dox?userId=${userId}`);
        const jsonData = await response.json();
        jsonData.profileImage = 'data:image/jpeg;base64,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';
        jsonData.posts = post;
        setUserInfo(jsonData);
      } catch (error) {
        console.error("에러!");
      }
    }
    async function fetchBoardList(){
      try{
        const response = await fetch(`http://localhost:4000/profileBoardListSearch.dox?userId=${userId}`);
        const jsonData = await response.json();
        console.log(jsonData.length);
        post = jsonData.length;
        console.log(userInfo);
        setList(jsonData);
        userInfo.posts = jsonData.length;
      }catch(error){
        console.log("에러!");
      }
    }
   
    fetchBoardList();
    fetchProfile();
    
  }, [userId]);
 


  return (
    <div className="profile_container">
      <div className="profile">
        <div className="profile-header">
          <div className="profile-image">
            <img src={userInfo.profileImage} alt="프로필 이미지" />
          </div>
          <div className="profile-info">
            <h2>{userInfo.USERNAME}</h2>

            {sessionStorage.getItem("userId").toLowerCase() === userId.toLowerCase() && <div className="optionBtn">
              <button>프로필 편집</button>
            </div>}
            {sessionStorage.getItem("userId").toLowerCase() != userId.toLowerCase() && <div className="optionBtn">
              <button>팔로우</button>
              <button>메시지 보내기</button>
            </div>}
            <p>{userInfo.profile}</p>
            
            <div className="profile-stats">
              <div>
                <strong>{userInfo.posts}</strong>
                <span>게시물</span>
              </div>
              <div>
                <strong>{userInfo.FOLLOWER}</strong>
                <span>팔로워</span>
              </div>
              <div>
                <strong>{userInfo.FOLLOWING}</strong>
                <span>팔로잉</span>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-posts">
          <h3>내가 작성한 게시글</h3>
          <div className="posts-list">
            {list.map(post => (
              <ProfilePost key={post.BOARDNO} title={post.TITLE} content={post.CONTENTS} />
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Profile;
