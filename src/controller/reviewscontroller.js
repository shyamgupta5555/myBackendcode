const mongoose = require('mongoose')
const reviwesModel = require('../models/reviwesModel')
const bookModel = require('../models/booksModel')
const objectId = mongoose.Types.ObjectId;

// ============= regex===================//
function isValide(value) {
  return (typeof value === "string" && value.trim().length > 0 && value.match(/^[A-Za-z ][A-Za-z _]{1,100}$/));
}
const reviewAtVliadtion = /^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/



// ===================== createreview ==================//

exports.createReview = async (req, res) => {
  try {
    let bookid = req.params.bookId
    let data = req.body
    let { rating, reviewedAt } = data
    data.bookId = bookid


    if (!rating) return res.status(400).send({ status: false, message: "provied a rating" })
    if (!reviewedAt) return res.status(400).send({ status: false, message: " provied a reviewedAt " })

    
    if (Object.keys(data) == 0) return res.status(400).send({ status: false, message: "body is empty" })


    let findBook = await bookModel.findOne({ _id: bookid, isDeleted: false })
    if (!findBook) return res.status(400).send({ status: false, message: "book not exits mongodb" })

    // ============= regex match ======================//

    if (data.rating) { if (!(rating >= 1 && rating <= 5)) return res.status(400).send({ status: false, message: "reating should be 1 to 5" }) }
    if (!reviewedAt.match(reviewAtVliadtion)) return res.status(400).send({ status: false, message: "not vaild reviewAt YYYY-MM-DD" })

    // =========== new object==========================//
    let newObject = {
      bookId: bookid,
      reviewedBy: data["reviewer's name"],
      reviewedAt: reviewedAt,
      rating: rating,
      review: data.review
    }

    if (!isValide(data["reviewer's name"])) { newObject.reviewedBy = "Guest"}
    else { newObject.reviewedBy = data["reviewer's name"] }


    let createReview = await reviwesModel.create(newObject)
    findBook.reviews = findBook.reviews + 1
    await findBook.save()

    res.status(201).send({ status: true, data: createReview})

  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }

}

// ======================== update api ==========================//

exports.updateReview = async function (req, res) {
  try {
    const bookid = req.params.bookId

    if (!objectId.isValid(bookid)) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter valide bookId" });
    }
    const reviewid = req.params.reviewId
    if (!objectId.isValid(reviewid)) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter valide reviewId" });
    }

    const data = req.body

    const { review, rating } = data
    const bookdata = await bookModel.findOne({ _id: bookid, isDeleted: false })
    if (!bookdata) return res.status(400).send({ status: false, msg: "book is not exist" })

    const reviewdata = await reviwesModel.findOne({ _id: reviewid, isDeleted: false })
    if (!reviewdata) return res.status(400).send({ status: false, msg: "this is not found reviewes data" })

    if (rating) { if (!(rating >= 1 && rating <= 5)) return res.status(400).send({ status: false, message: "reating should be 1 to 5" }) }

    const change = {
      review: review,
      rating: rating
    }

    if (!isValide(data["reviewer's name"])) { change.reviewedBy = reviewdata.reviewedBy }
    else { change.reviewedBy = data["reviewer's name"] }

    const reviewupdate = await reviwesModel.findByIdAndUpdate(reviewid, { $set: change }, { new: true })
    return res.status(200).send({ status: true, message: "the updqate is sucessfulley done", data: reviewupdate })
  } catch (err) {
    return res.status(500).send({ status: false, massege: err.message })
  }
}

// ========================= delet api ======================//


exports.deleterive = async function (req, res) {

  try {
    const bookid = req.params.bookId
    const reviewsid = req.params.reviewId
    if (!objectId.isValid(bookid)) { return res.status(400).send({ status: false, msg: "please enter valide bookId" }); }
    if (!objectId.isValid(reviewsid)) { return res.status(400).send({ status: false, msg: "please enter valide reviewsid" }); }

    const getbooks = await bookModel.findOne({ _id: bookid, isDeleted: false })
    if (!getbooks) return res.status(404).send({ status: false, message: "book is not exist" })

    const datareviews = await reviwesModel.findOneAndUpdate({ _id: reviewsid, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
    if (!datareviews) return res.status(404).send({ status: false, msg: "this reviews id not exists" })

    getbooks.reviews = getbooks.reviews - 1
    await getbooks.save()

    return res.status(200).send({ status: true, message: `This review :${datareviews.reviewedBy} is successfully  deleted`})                   
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}



