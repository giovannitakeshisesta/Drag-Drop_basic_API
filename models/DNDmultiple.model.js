const mongoose = require("mongoose");

const colSchema = new mongoose.Schema({
  xxx: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "List",
  },
});

const DNDmultipleSchema = new mongoose.Schema({
  col1: colSchema,
  col2: colSchema,
  col3: colSchema,
});

const DNDmultiple = mongoose.model("DNDmultiple", DNDmultipleSchema);

module.exports = DNDmultiple;
