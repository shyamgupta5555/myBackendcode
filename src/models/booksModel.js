const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const booksModel = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },

    excerpt: { type: String, required: true },

    userId: { type: objectId, required: true, ref: "User" },

    ISBN: { type: String, required: true, unique: true },

    category: { type: String, required: true },

    subcategory: { type: String, required: true },

    reviews: { type: Number, default: 0 },

    deletedAt: Date,

    isDeleted: { type: Boolean, default: false },

    releasedAt: { type: String, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Book", booksModel);
