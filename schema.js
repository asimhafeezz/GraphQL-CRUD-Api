const mongoose = require('mongoose')

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

//mongoose Customer model
const customerModel = mongoose.model("customers", {
    name: String,
    email: String,
    age: String
})



//customerType
const customerType = new GraphQLObjectType({
    name:'Customers',
    fields:{
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLString}
    }
})

//Root Query
const rootQuery = new GraphQLObjectType({
    name:'rootQuery',
    fields:{
        //List of All Customers
        allCustomers:{
        type: new GraphQLList(customerType),
        resolve:(root , args , context , info)=>{
            return customerModel.find().exec() 
        }
    }
    }
})

// Mutation (Add , Delete , Update , findOne)
const mutation = new GraphQLObjectType({
    name: "mutation",
    fields:{
        // Add Customers
        addCustomer:{
            name:"addCustomers",
            type: customerType,
            args:{
                name:{type: GraphQLString},
                email:{type: GraphQLString},
                age:{type: GraphQLString},
            },
            resolve:(root , args , context , info)=>{
                const cust = new customerModel(args)
                return cust.save()
            }
        },
        //Delete Customer by name
        deleteCustomer:{
            name:"deleteCustomer",
            type:customerType,
            args:{
                name:{type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (root , args)=>{
                return customerModel.deleteOne({name: args.name})
            }
        },
        // Update Customer by name
        updateCustomer:{
            name:"updateCustomer",
            type: customerType,
            args:{
                id:{type: GraphQLString},
                name:{type: GraphQLString},
                email:{type: GraphQLString},
                age:{type: GraphQLString}
            },
            resolve:(root , args)=>{
                return customerModel.findByIdAndUpdate(args.id , {
                    name: args.name
                })
            }
        },
        //find Customer by id
        findOneCustomers:{
            name:"findOneCustomers",
            type: customerType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve:(root , args)=>{
                return customerModel.findById(args.id)
            }
        }
    }
})


module.exports  = new GraphQLSchema({
    query: rootQuery,
    mutation
})