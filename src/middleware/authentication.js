const jwt = require("jsonwebtoken")


const Authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"]
    if (!token) return res.status(400).send({ status: false, message: "Token is mandatory" })

    let decodedToken = jwt.verify(token, "project1group11")
    req.id = decodedToken.userId;
    next()
  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}
module.exports.Authentication = Authentication;

