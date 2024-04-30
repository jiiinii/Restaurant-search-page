const express = require('express');
const app = express();
const path = require('path');

app.listen(8080,function(){
  console.log('서버 오픈 완료!')
})

// 이게 있어야 특정 폴더의 파일들 전송가능 
app.use(express.static(path.join(__dirname,'my-todo-client/build')))


// '/'경로로 접속시에 저 파일을 보내주자! 
app.get('/',(res,req)=>{
  req.sendFile(path.join(__dirname,'blog/public/index.html'));
})