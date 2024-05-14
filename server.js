const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`서버가 포트 ${PORT}에서 실행 중입니다`));
require("dotenv").config({ path: "variable.env" });

const MONGODB_URL =
  "mongodb+srv://jiiinhuiii0104:niD4HQXWphfczZOl@cluster0.cnekfui.mongodb.net/";

  const connection = mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true })
    .then(() => {console.log("Successfully connect.");})
    .catch((e) => console.log(e));
    
// API 라우트 생성
const Item = require("./src/Models/Item");

// 데이터 가져오기
app.get("/api/items", async (req, res) => {
  console.log(`server.js >>>`);
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).send("서버 오류");
  }
});

app.use(express.json());

// 데이터를 서버로 제출. 데이터베이스에 추가 or 업데이트
app.post("/api/items", async (req, res) => {
  console.log("Content-Type", req.headers["content-type"]);
  console.log("req.body", req.body);

  // DB 데이터 저장
  const blog = new Item(req.body);
  await blog.save();
});

// app.delete(path, callback, [callback])
app.delete("/delete", async(req, res) => {
  try {
    //
  } catch (error) {
    res.status(500).send("서버 오류");
  }
})