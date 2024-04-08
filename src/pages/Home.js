
import React, { useState, useEffect } from 'react';
import Post from '../components/Menu';
import { legacy_createStore } from 'redux';
import _ from "lodash";
import { Provider, useSelector, useDispatch } from 'react-redux';

function Home({onLogin}){
    const [list, setList] = useState([]);
    
    useEffect(() => {
      onLogin();
    async function fetchProfile() {
      try {
        const response = await fetch(`http://localhost:4000/boardListSearch.dox`);
        const jsonData = await response.json();
        setList(jsonData);
        
    }
       catch (error) {
        console.error("에러!");
        console.log(error);

      }
    }
    fetchProfile();
  }, []);
  
  function reducer(state, action){
  
   
   
   
    return state
  
  }
  const store = legacy_createStore(reducer);
  return <div className="container">
  <h1 className="text-center my-5">🅼🆈 🆂🅽🆂</h1>
  <div className="row justify-content-center">
      <div className="col-sm-6 col-md-6 col-lg-6">
          {list.map(post => (
              <Post key={post.BOARDNO} userid ={post.USERID} like={post.LIKE}  title={post.TITLE} content={post.CONTENTS} />
          ))}
      </div>
  </div>
</div>
}

export default Home;