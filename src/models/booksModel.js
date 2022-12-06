const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

const booksModel = new mongoose.Schema(
  {
    bookCover: String,
    title: { type: String, required: true, unique: true,trim : true },

    excerpt: { type: String, required: true,trim : true },

    userId: { type: objectId, required: true, ref: "User" },

    ISBN: { type: String, required: true, unique: true,trim : true },

    category: { type: String, required: true ,trim : true},

    subcategory: { type: String, required: true,trim : true },

    reviews: { type: Number, default: 0 },

    deletedAt:  Date,

    isDeleted: { type: Boolean, default: false },

    releasedAt: { type:String, required: true,trim : true },
    
  },

  { timestamps: true }
);


// Assignment:
//  add bookCover(string) key in your bookModel in Book managemt project. When book is being created , take up the book cover as an image , upload it to s3 and save the url in bookCover key. Submit a short explainer video on the same( individually)

module.exports = mongoose.model("Book", booksModel);
