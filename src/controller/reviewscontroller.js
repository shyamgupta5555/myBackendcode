const mongoose = require('mongoose')
const reviwesModel = require('../models/reviwesModel')
const bookModel = require('../models/booksModel')
const objectId = mongoose.Types.ObjectId;

// ===================== createreview ==================//

const createReview = async (req, res) => {
  try {

    let data = req.body
    let bookid = req.params.bookId
    if (Object.keys(data) == 0) return res.status(400).send({ status: false, message: "body is empty" })

    data.bookId = bookid

    let findBook = await bookModel.findOne({ _id: bookid, isDeleted: false })
    if (!findBook) return res.status(400).send({ status: false, message: "book not exits mongodb" })

    let newObject = {
      bookId: bookid,
      reviewedBy: data["reviewer's name"],
      reviewedAt: data.reviewedAt,
      rating: data.rating,
      review: data.review
    }

    if (!data["reviewer's name"]) { newObject.reviewedBy = 'Guest' }
    let createReview = await reviwesModel.create(newObject)
    findBook.reviews = findBook.reviews + 1
    await findBook.save()

    res.status(201).send({ status: true, data: createReview })


  } catch (err) {
    res.status(500).send({ status: false, message: err.message })
  }

}

// ======================== update api ==========================//

const updateReview = async function (req, res) {
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
    const change = {
      review: review,
      rating: rating,
      reviewedBy: data["reviewer's name"]
    }
    if (!data["reviewer's name"]) { change.reviewedBy = 'Guest' }
    const reviewupdate = await reviwesModel.findByIdAndUpdate(reviewid, { $set: change }, { new: true })
    return res.status(200).send({ status: true, message: "the updqate is sucessfulley done", data: reviewupdate })
  } catch (err) {
    return res.status(500).send({ status: false, massege: err.message })
  }
}

// ========================= delet api ======================//


const deleterive = async function (req, res) {

  try{
  const bookid = req.params.bookId
  const reviewsid = req.params.reviewId
  if (!objectId.isValid(bookid)) { return res.status(400).send({ status: false, msg: "please enter valide bookId" }); }
  if (!objectId.isValid(reviewsid)) { return res.status(400).send({ status: false, msg: "please enter valide reviewsid" }); }

  const getbooks = await bookModel.findOne({ _id: bookid, isDeleted: false })
  if(!getbooks)return res.status(404).send({status:false , message:"book is not exist"})

  const datareviews = await reviwesModel.findOneAndUpdate({_id :reviewsid , isDeleted:false},{$set:{isDeleted: true , deletedAt:new Date()}},{new: true})
  if (!datareviews) return res.status(404).send({ status: false, msg: "this reviews id not exists" })

 getbooks.reviews = getbooks.reviews -1
  await getbooks.save()

  return res.status(200).send({status: true ,message:"review is successfully is deleted"})
}catch(err){
 return  res.status(500).send({status: false, message:err.message})
}
}




module.exports.deleterive = deleterive
module.exports.updateReview = updateReview
module.exports.createReview = createReview