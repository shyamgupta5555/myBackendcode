const mongoose = require("mongoose");
const booksModel = require("../models/booksModel");
const userModel = require("../models/userModel");
const reviwesModel = require("../models/reviwesModel");

//----------------//validation//----------------------------------------------------------------------
const objectId = mongoose.Types.ObjectId;
const isbnValidation = /^(?=(?:\D*\d){10,13}(?:(?:\D*\d){3})?$)[\d-]+$/
const dateVliadtion = /^((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/
function isValide(value) {
    return (typeof value === "string" && value.trim().length > 0 && value.match(/^[A-Za-z ][A-Za-z _]{1,100}$/));
}


//---------------------------------//book creation //--------------------------------------------------------
exports.createbooks = async (req, res) => {
    try {
        const data = req.body;
        const { title, excerpt, userId, ISBN, category, subcategory, isDeleted, releasedAt } = data;
        if (Object.keys(req.body).length == 0) {
            res.status(404).send({ status: false, msg: "body is empty" })
        }

        // ==============mandatory  validation=============================//

        if (!title) return res.status(400).send({ status: false, message: "please enter title" })
        if (!excerpt) return res.status(400).send({ status: false, message: "please enter excerpt" });
        if (!userId) return res.status(400).send({ status: false, message: "please enter userId" })
        if (!ISBN) return res.status(400).send({ status: false, message: "please enter ISBN" })
        if (!category) return res.status(400).send({ status: false, message: "please enter category" });
        if (!subcategory) return res.status(400).send({ status: false, message: "please enter subcategory" });
        if (!releasedAt) return res.status(400).send({ status: false, message: "please enter releasedAT" });

        //   ================== regex validation===============//

        if (!isValide(title)) return res.status(400).send({ status: false, message: "please enter properly title" });
        if (!isValide(excerpt)) return res.status(400).send({ status: false, message: "please enter properly excerrpt" });
        if (!isValide(category)) return res.status(400).send({ status: false, message: "please enter properly category" });
        if (!isValide(subcategory)) return res.status(400).send({ status: false, message: "please enter subcategory" });
        if (!ISBN.match(isbnValidation)) return res.status(400).send({ status: false, message: "please enter valid ISBN number" });
        if (!releasedAt.match(dateVliadtion)) return res.status(400).send({ status: false, mmessage: "the formate of releasedAt should be like YYYY-MM-DD " });

        // ==================== Db call unique ========//

        if (isDeleted == true) { data.deletedAt = new Date() }

        const gettitele = await booksModel.findOne({ title: title });
        if (gettitele) return res.status(400).send({ status: false, message: "title is allready exsist" });

        const ISBNfind = await booksModel.findOne({ ISBN: ISBN });
        if (ISBNfind) return res.status(400).send({ status: false, message: "ISBN is allready exsist" });

        const userid = await userModel.findOne({ _id: userId, isDelete: false });
        if (!userid) return res.status(404).send({ status: false, message: "userId is not exsist" });

        // ===========create book====================//

        const savedata = await booksModel.create(data);
        return res.status(201).send({ status: true, message: "successfull book creation", data: savedata, });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};



//---------------------------------//getbooks//-----------------------------//

exports.getbooks = async (req, res) => {
    try {
        const input = req.query;
        input.isDelete = false;

        const data = await booksModel.find(input).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1, }).sort({ title: 1 });

        if (data.length == 0) return res.status(404).send({ status: false, message: "data is not found" });
        return res.status(200).send({ status: true, data: data });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

// ======================= getBookiD======//

exports.getBybookid = async (req, res) => {
    try {
        const bookid = req.params.bookId;

        if (!objectId.isValid(bookid)) {
            return res.status(400).send({ status: false, msg: "please enter valide bookid" })
        }

        let data = await booksModel.findOne({ _id: bookid, isDeleted: false }).lean();
        if (!data) return res.status(404).send({ status: false, msg: "book is not exists " });

        const reviews = await reviwesModel.find({ bookId: bookid, isDeleted: false })
        data.reviewsdata = reviews;

        if (reviews.length == 0) return res.status(200).send({ status: true, msg: "#book-details-response-no-reviews", data: data, });

        return res.status(200).send({ status: true, msg: "#successful-response-structure", data: data });

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};


// ======================= update api =========================//

exports.updatebook = async (req, res) => {
    try {
        const input = req.params.bookId;
         const data = req.body;
        const { title, excerpt, ISBN, releasedAt } = data

        if (Object.keys(req.body).length == 0)
            return res.status(404).send({ status: false, msg: "body is empty" })
        if (ISBN) {
            if (!ISBN.match(isbnValidation))
                return res.status(400).send({ status: false, msg: "please enter valid ISBN number" });
        }

        if (title) {
            if (!isValide(title)) {
                return res.status(400).send({ status: false, msg: "please enter properly title" });
            }
        }

        if (excerpt) {
            if (!isValide(excerpt)) {
                return res.status(400).send({ status: false, msg: "please enter properly excerrpt" })
            }
        }

        if (releasedAt) {
            if (!releasedAt.match(dateVliadtion))
                return res.status(400).send({ status: false, msg: "the formate of releasedAt should be like YYYY-MM-DD" });
        }

        const findtitle = await booksModel.findOne({ title: title, isDeleted: false });
        if (findtitle) return res.status(404).send({ status: false, message: "titel is allready exsist" });

        const ISBNfind = await booksModel.findOne({ ISBN: ISBN, isDeleted: false });
        if (ISBNfind) return res.status(400).send({ status: false, message: "ISBN is allready exsist" });

        const change = {
            title: title,
            excerpt: excerpt,
            ISBN: ISBN,
            releasedAt: releasedAt,
        };

        const newdata = await booksModel.findByIdAndUpdate(input, { $set: change }, { new: true });

        return res.status(200).send({ status: true, message: "the update is sucessfully done", data: newdata, });

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

// ====================== delet api=========================//
exports.deleteBookById = async (req, res) => {
    try {
        let bookId = req.params.bookId;

        //=====================Fetching the data of Book(not deleted) then Delete=====================//
        let deleteByBookId = await booksModel.findOneAndUpdate({ _id: bookId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })

        //====================Checking the Book Data is Present(Deleted) or Not======================//
        if (!deleteByBookId) { return res.status(404).send({ status: false, message: "No Book Document Found!" }) }

        res.status(200).send({ status: true, message: `This Book: ${deleteByBookId.title} is Deleted Successfully` })

    } catch (error) {

        res.status(500).send({ status: 'error', error: error.message })
    }
}






