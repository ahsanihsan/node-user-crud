const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  user_name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

module.exports = mongoose.model("User", UserSchema);
