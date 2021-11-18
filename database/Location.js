var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var locationSchema = new Schema({
  latitude: {
    type: String,
    required: true,
  },
  longitude:String
});

module.exports = mongoose.model("location", locationSchema);