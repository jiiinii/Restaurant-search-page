const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 실행 중입니다`));
require('dotenv').config({path:'variable.env'});

const MONGODB_URL = 'mongodb+srv://jiiinhuiii0104:niD4HQXWphfczZOl@cluster0.cnekfui.mongodb.net/'

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("Successfully connect."))
  .catch((e) => console.log(e));

  // API 라우트 생성
  const Item = require('./src/Models/Item');

  app.get('/api/items', async (req, res) => {
    console.log(`server.js >>>`);
    try {
      const items = await Item.find();
      res.json("text");
      console.log(`server.js items>>>`,items);
    } catch (error) {
      console.log(error);
      res.status(500).send('서버 오류');
    }
  });