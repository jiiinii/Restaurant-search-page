// MongoDB 컬렉션에 대한 스키마를 정의.
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Item", itemSchema);