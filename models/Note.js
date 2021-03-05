const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  year: { type: Number, default: 0 },
  month: { type: Number, default: 0 },
  day: { type: Number, default: 0 },
  hour: { type: Number, default: 0 },
  text: { type: String, default: "" },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Note", schema);
