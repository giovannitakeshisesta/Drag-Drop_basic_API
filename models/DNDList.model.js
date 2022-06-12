const mongoose = require("mongoose");

const DNDListSchema = new mongoose.Schema(
  {
    xxx: { type: [mongoose.Schema.Types.ObjectId], ref: "List" },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const DNDList = mongoose.model("DNDList", DNDListSchema);

module.exports = DNDList;
