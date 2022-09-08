const {UserInputError,AuthenticationError} = require('apollo-server');
const Post = require('../../models/Post');
const {commentInputValidate} = require('../../utils/validators');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Mutation: {
    createComment:async(_,{postId,body},context)=>{
        const {username}=checkAuth(context);

        const {errors,valid}=commentInputValidate(body);

        if(!valid) {
            throw new UserInputError("comment is empty",{errors})
        }

        const post=await Post.findById(postId);
        if(post) {
            post.comments.unshift({
                body,
                creator:username,
                createdAt:new Date().toISOString()
            })
            await post.save();

            return post;
        }else{
            throw new UserInputError("post not found");
        }

    },
    deleteComment:async(_,{postId,commentId},context)=>{
            const {username}=checkAuth(context);

            const post=await Post.findById(postId);

            if(post) {
                const commentIndex=post.comments.findIndex(c=>c.id===commentId);

                if(post.comments[commentIndex].creator===username) {
                    post.comments.splice(commentIndex,1);
                    await post.save();
                    return post;
                }else{
                    throw new AuthenticationError("action not allowed");
                }
            }else{
                throw new UserInputError("post not found")
            }


    }
  },
};

