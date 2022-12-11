const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const StudentScehma = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  currentClass: { type: Number, required: true },
  division: { type: String, required: true },
});

const Students = mongoose.model("Students", StudentScehma);

const CounterSchema = new Schema({
  idname: { type: String },
  seq: { type: Number },
});

const Counter = mongoose.model("Counter", CounterSchema);

module.exports = { Students, Counter };
