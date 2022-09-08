const {ApolloServer}=require("apollo-server");
const mongoose=require("mongoose");


const {MONGO_URI}=require("./config");
const typeDefs=require("./graphql/typeDefs");
const resolvers=require("./graphql/resolvers");






const server=new ApolloServer({typeDefs,resolvers,context:({req})=>({req})})

mongoose.connect(MONGO_URI).then(()=>{
    console.log("mongodb connected")
    return server.listen({port:9000})
})
.then(({url})=>{
    console.log(`server running at ${url}`)
})
