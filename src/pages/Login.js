import  React,{useState, useEffect  } from 'react';
import Pico from '@picocss/pico';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import imageData from "../imgData";


    

    const renderSlides = imageData.map(image => (
        <div key={image.alt}>
          <img src={image.url} alt={image.alt} />
      </div>
    ))


const Login = ({onLogin}) => {
  sessionStorage.clear()
    const [currentIndex, setCurrentIndex] = useState();
    function handleChange(index) {
      setCurrentIndex(index);
    }

    const navigate = useNavigate();
    async function fnLogin() {
        var userId = document.getElementById("userId").value;
        var pwd = document.getElementById("pwd").value;
      try {
        const response = await fetch(`http://localhost:4000/login.dox?userId=${userId}&pwd=${pwd}`);
        const jsonData = await response.json();
        if(jsonData.msg=="success"){
           
            alert("로그인 성공");
            sessionStorage.setItem('userId', userId);
            onLogin();
            navigate('/profile');

        }
        else{
           alert("로그인 실패");
            
        }
        
       
      } catch (error) {
        console.error("에러!");
      }
    }
  return (
    
    <main className="container_login">
       
       <div id="LoginImgBox">
        <div id="LoginImgPhone">
       <img src="https://cdn.pixabay.com/photo/2018/09/03/07/47/mobile-3650579_1280.png"/>
       
       <div id="LoginImgPhoneSlide">
        <Carousel
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          dynamicHeight={false}
          stopOnHover={false}
          showStatus={false}
          showIndicators={false}
          interval={5000}
          
          selectedItem={imageData[currentIndex]}
          onChange={handleChange}
          className="w-[400px] h-[1000px] lg:hidden ">
          {renderSlides}
        </Carousel>
        </div>
        </div>
    </div>

        <div>
        
            <div className="contatiner_header">
            𝒮𝒩𝒮 ℒℴℊ𝒾𝓃
            </div>
            <div>
        
  <fieldset>
    <label>
     
      <input
        id ="userId"
        name="first_name"
        placeholder="아이디를 입력하세요"
        autoComplete="given-name"
      />
    </label>
    <label>
      
      <input
        id = "pwd"
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        autoComplete="password"
      />
    </label>
  </fieldset>

  <input
    type="button"
    value="로그인"
    onClick={fnLogin}
  />

</div>
</div>
  </main>
  );
};

export default Login;
