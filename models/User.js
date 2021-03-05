const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate:{type:Date, default:Date.now},
  lastLogin:{type:Date, default:Date.now},
  admin:{type:Boolean, default:false},
  active:{type:Boolean, default:false},
  block:{type:Boolean, default:false},
  owner: [{ type: Types.ObjectId, ref: "Note" }],
});

module.exports = model("User", schema);
