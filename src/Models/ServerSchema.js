// require로 mongoose 모듈 불러오기
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  // MongoDB 컬렉션에 대한 스키마를 정의.
  name: { type: String, required: true },
  time: { type: String, required: true }
});

// user라는 모델을 itemSchema로 사용하여 정의 & moongoose에 등록
module.exports = mongoose.model("user", itemSchema);