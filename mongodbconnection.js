const mongoose = require('mongoose')

//MongoDB Connection
const connectionString = "mongodb+srv://$[username]:$[password]@$[hostlist]/$[database]?retryWrites=true"

module.exports = mongoose.connect(connectionString , { useNewUrlParser: true ,useUnifiedTopology: true })
.then(()=>{
    console.log("Mongodb is Connected")
})
.catch(err =>{
    console.log(err)
})



