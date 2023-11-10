const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  description:{
    type : String, 
    required : false,
  },
  keyName: {
    type: String,
    required : true
  },

});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;