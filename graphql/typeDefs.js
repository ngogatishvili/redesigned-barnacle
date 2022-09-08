const {gql}=require("apollo-server")


module.exports=gql`

    type Post {
        id:ID!
        body:String!
        createdAt:String!
        creator:String!
        comments:[Comment!]!
        likes:[Like!]!

    }

    type Comment {
        id:ID!
        createdAt:String!
        creator:String!
        body:String!
        
    }

    type Like {
        id:ID!
        createdAt:String!
        creator:String!
    }

    type User {
        id:ID!
        email:String!
        token:String!
        createdAt:String!
        username:String!
    }

   
    type Query {
       posts: [Post!]!
       post(postId:ID!):Post!
    }

    input RegisterInput {
        username:String!
        email:String!
        password:String!
        confirmPassword:String!
    }

    type Mutation {
        register(registerInput:RegisterInput!):User!,
        login(username:String!,password:String!):User!
        createPost(body:String!):Post!
        deletePost(postId:ID!):String!
        createComment(postId:ID!,body:String!):Post!
        deleteComment(postId:ID!,commentId:ID!):Post!
        likePost(postId:ID!):Post!
    }

   

    
`