

const date =  new Date()

// console.log(date)
const datecheck = function(){
  let d = date.getDate();
  return d

}

const checkMonth = function(){
  let d = date.getMonth()+1 ;
  return d
}


const checkBatch = function(){
  let a ={
    batchName : "lithium ",
    day :"W3D3",
    topic: "the topic for today is Nodejs module system’"
  }
 
  return (a.batchName +a.day +a.topic)
}




module.exports.batch =checkBatch
module.exports.month =checkMonth
module.exports.date = datecheck
  












