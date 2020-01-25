const express = require('express')
const ExpressGraphqlObject = require('express-graphql')
const schema = require('./schema')
const app = express()

//mongodb Connection
require('./mongodbconnection')

//use middleware function
app.use('/graphql' , ExpressGraphqlObject({
    schema,
    graphiql:true
}))



//port
const port = process.env.PORT || 4000

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})
