const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
