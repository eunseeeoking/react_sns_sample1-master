const express = require('express');
var cors = require('cors')
const mysql = require('mysql');
const path = require('path');
var escapeHtml = require('escape-html')
var session = require('express-session')

const app = express();

app.use(cors());
app.use(session({
  secret: 'test',
  resave: true,
  saveUninitialized: false,
}))

//ejs 설정
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'.')); // .은 경로

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test1234',
  database: 'test'
});



connection.connect(function(err) {
  if (err) {
    console.error('db 연결 실패!');
    return;
  }
  console.log('db 연결 성공!');
});






app.get('/', function (req, res) {
  res.send('Hello World');

});

app.get('/boardList', function (req, res) {
  res.render('boardList');
});

app.get('/profile.dox', function (req, res) {
  var map = req.query;
 
  connection.query(`SELECT * FROM ES_SNS_USER WHERE USERID = ?`,[map.userId], function (error, results, fields) {
      if(error) throw error

      if(results.length == 0){
          res.send({result : "사용자없음"});
      } else {
          res.send(results[0]);
      }
  });
});

app.get('/profileBoardListSearch.dox', function (req, res) {
  var map = req.query;
  console.log(map);
  connection.query(`SELECT * FROM es_sns_board WHERE USERID = ?`,[map.userId], function (error, results, fields) {
      if(error) throw error
    
      res.send(results);
      
  });
});

  app.get('/boardListSearch', function (req, res) {

  
  connection.query(`SELECT boardNo,contents, title, userId, DATE_FORMAT(CDATETIME, '%Y-%m-%d %p %h:%i') AS cdatetime FROM TBL_BOARD`, function (error, results, fields) {
    if (error) throw error;
 
   res.send(results);
   
    
  });

  });
  app.get('/boardListSearch.dox', function (req, res) {

  
    connection.query(`SELECT * FROM es_sns_board`, function (error, results, fields) {
      if (error) throw error;
   
     res.send(results);
     
      
    });
  
    });

  app.get('/userIdSearch', function (req, res) {

    var map = req.query;
    
    connection.query(`SELECT userId FROM TBL_USER WHERE USERID = '${map.userId}'`, function (error, results, fields) {
      if (error) throw error;
      if(results.length != 0) {
        res.send({msg :"사용이 불가한 아이디 입니다." });
      }
      else{
        res.send({msg :"사용 가능한 아이디 입니다." });
      }     
    });
  
    });

  app.get('/boardView/:boardNo', function (req, res) {
    var map = req.params;
    
    res.render('boardView',{jsonData : map});
  });

  app.get('/boardView.dox', function (req, res) {
  var map = req.query;
  console.log(map);
  connection.query(`SELECT * FROM TBL_BOARD WHERE boardNo = '${map.boardNo}'`, function (error, results, fields) {
    if (error) throw error;
    if(results.length != 1){
      res.send({msg : "fail"});
     }else{
      res.send({msg : "success",results});
      
     }
   
    
  });
});



app.get('/boardEdit.dox', function (req, res) {
  var map = req.query;
  console.log(map);
  connection.query(`UPDATE TBL_BOARD SET TITLE = '${map.title}',CONTENTS='${map.contents}' WHERE BOARDNO='${map.boardNo}'`, function (error, results, fields) {
    if (error) throw error;
    res.send({msg:"success"});
  });
});



app.get('/boardDelete.dox', function (req, res) {
  var map = req.query;
  console.log(map);
  connection.query(`DELETE FROM TBL_BOARD WHERE BOARDNO='${map.boardNo}'`, function (error, results, fields) {
    if (error) throw error;
    res.send({msg:"success"});
  });
});

app.get('/boardAdd.dox', function (req, res) {
  var map = req.query;
  console.log(map);
  connection.query("INSERT INTO TBL_BOARD VALUES(NULL,?,?,?,NOW())",[map.title,map.contents,req.session.userId], function (error, results, fields) {
    if (error) throw error;
    res.send({msg:"success"});
  });
});



app.get('', function (req, res) {
  var map = req.query;
  console.log(map);
  connection.query(`DELETE FROM TBL_BOARD WHERE BOARDNO='${map.boardNo}'`, function (error, results, fields) {
    if (error) throw error;
    res.send({msg:"success"});
  });
});

app.get('/boardAdd', function (req, res) {
  res.render('boardAdd',{});
});

app.get('/login', function (req, res) {
  res.render('userLogin');

});

app.get('/sessionCheck.dox', function (req, res) {
  console.log("체크 ==>" , req.session.userId);
  connection.query(`SELECT * FROM ES_SNS_USER WHERE userId = '${req.session.userId}'`, function (error, results, fields) {
    if (error) throw error;
   if(results.length != 1){
    res.send({msg:"off"});
   }else{
    res.send({msg : "on"});
   }
  });
});

app.get('/login.dox', function (req, res) {
  var map = req.query;
  console.log(map);
  connection.query(`SELECT * FROM ES_SNS_USER WHERE userId = '${map.userId}' AND pwd = '${map.pwd}'`, function (error, results, fields) {
    if (error) throw error;
    if(results.length != 1){
      res.send({msg : "fail"});
     }else{
      req.session.userId = map.userId;
      res.send({msg : "success", results});
     
      console.log("로그인 ==>" , req.session.userId);
     
     }
    
  });
});



app.listen(4000);