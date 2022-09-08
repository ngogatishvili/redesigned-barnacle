const {AuthenticationError}=require("apollo-server")

const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');


module.exports = {
  Query: {
    posts: async (_, args) => {
      try {
        const posts = await Post.find().sort({createdAt: -1});
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    post: async (_, {postId}) => {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, {body}, context) => {
      const user = checkAuth(context);
      console.log(user);

      const newPost = new Post({
        body,
        createdAt: new Date().toISOString(),
        creator: user.username,
        creatorId: user.id,
      });
      const post = await newPost.save();

      return post;
    },
    deletePost: async (_, {postId}, context) => {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (post.creator === user.username) {
            await post.delete();
            return "Post deleted succesfully"
        }else{
            throw new AuthenticationError("action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
