let axios = require("axios")




// ====== assigment 1 api ================
let getDistrictsfind = async function (req, res) {
    try {

        let id = req.query.district_id
        let date = req.query.date
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`

        }
        let result = await axios(options);
        console.log(result)
        let data1 = result.data
        console.log(data1)
        res.status(200).send({ msg: data1, status: true })

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//  ====================2 api 

let getWeatherCities = async function (req, res) {
    try {
        const  id = req.query.appid
        const cities = ["bengaluru", "mumbai", "delhi", "kolkata", "chennai", "london", "moscow"];
        const temp = [];
        for (let i of cities) {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${i}&appid=${id}`);
            temp.push({ city: i, temp: response.data.main.temp });

        }
        temp.sort((a, b) => a.temp - b.temp);
        res.status(200).send({ data :temp});
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

// ========================3

let getMems= async function (req, res) {
    try {

        let memesId  = req.query.template_id
        let text0 = req.query.text0
        let text1 = req.query.text1
        let username = req.query.username
        let password =req.query.password
         let options = {
            method: "get",
            url: `https://api.imgflip.com/caption_image?template_id=${memesId}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`

        }
        let result = await axios(options)
        res.status(200).send({msg :result.data})
    
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.getMems =getMems



// http://api.openweathermap.org/2.5/weather?q=delhi&appid=5a03641e61c9c9b0379a79778f8f933d


module.exports.getWeatherCities = getWeatherCities
module.exports.getDistrictsfind = getDistrictsfind
































// ======================================



let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
// ---------------------------
let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: 'get',
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }///v4/appointment/sessions/findByPin
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
// ===================
let getOtp = async function (req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

module.exports.getStates = getStates
module.exports.getDistricts = getDistricts

module.exports.getByPin = getByPin
module.exports.getOtp = getOtp