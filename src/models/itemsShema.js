const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Items = new Schema({
  id: Number,
  category: String,
  imgUrl: String,
  name: String,
  display: Number,
  color_0: String,
  color_1: String,
  color_2: String,
  color_3: String,
  color_4: String,
  color_5: String,
  price: Number,
  chip_name: String,
  chip_cores: Number,
  ram: Number,
  storage: Number,
  touchId: Boolean,
  faceId: Boolean,
  wireless_0: String,
  wireless_1: String,
  camera_front: String,
  camera_back: String,
  audio_microphone: String,
  audio_speakers: String,
  size_height: String,
  size_width: String,
  size_depth: String,
  size_weight: String,
  os: String,
  InTheBox_0: String,
  InTheBox_1: String,
  InTheBox_2: String,
  InTheBox_3: String,
  InTheBox_4: String,
  InTheBox_5: String,

  orderInfo_inStock: Number,
  orderInfo_reviews: Number,
});
const itemsShema = mongoose.model('Items', Items);
module.exports = itemsShema;
