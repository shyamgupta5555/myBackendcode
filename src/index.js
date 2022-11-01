const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://shyamgupta:.T!8NRrzf6FyMYc@cluster0.dbdyccj.mongodb.net/shyam-db?retryWrites=true&w=majority"
, {
   useNewUrlParser: true 
}
).then( () => {console.log( "MongoDb is connected")}  )
.catch( err => console.log(err))


app.use(
    function (req ,res ,next){
        let d = new Date()
       console.log(d ,req.socket.remoteAddress,req.url)

           next() 
        
    }
)


app.use (
    function (req, res, next) {
        console.log ("inside GLOBAL MW");
        next();
  }
  );
app.use('/', route);






app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});
