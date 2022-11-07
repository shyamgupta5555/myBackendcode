
const jwt = require("jsonwebtoken");

const authenticate = function(req, res, next) {

    let token = req.headers["x-Auth-token"];
    console.log(token)
    if (!token) token = req.headers["x-auth-token"];
    if (!token){ return res.send({ status: false, msg: "token not present" })}
    next()

}




const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let token = req.headers["x-Auth-token"];
    console.log(token)
    if (!token) token = req.headers["x-auth-token"];
    if (!token){ return res.send({ status: false, msg: "token not present" })}
    let decodedToken = jwt.verify(token, "functionup-lithium");
    if (!decodedToken){
      return res.send({ status: false, msg: "token is invalid" })}
    next()
}


module.exports.authenticate = authenticate
module.exports.authorise =  authorise