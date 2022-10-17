
let stringTrim = function () {
  const str = "      this Is Shyam      "
  // console.log(str)
   return str.trim()
  console.log(str.toUpperCase())
  console.log(str.toLowerCase())

}

let stringUpper = function () {
  const str = "      this Is Shyam      "
  // console.log(str)
   return str.toUpperCase()
  console.log(str.toLowerCase())

}
let stringLower = function () {
  const str = "      this Is Shyam      "
  // console.log(str)
   return str.toLowerCase()

}


module.exports.string1 = stringTrim
module.exports.upper = stringUpper
module.exports.lower = stringLower
















