const {Schema,model}=require("mongoose");



const PostSchema=new Schema({
    body:String,
    creator:String,
    createdAt:String,
    comments:[
        {
            body:String,
            creator:String,
            createdAt:String
        }
    ],
    likes:[
        {
            creator:String,
            createdAt:String
        }
    ],
    creatorId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})


module.exports=model("Post",PostSchema);

