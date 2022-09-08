const bcrypt = require('bcryptjs');
const {UserInputError} = require('apollo-server');

const User = require('../../models/User');
const {registerInputValidate,loginInputValidate} = require('../../utils/validators');
const generateToken=require("../../utils/generateToken");

module.exports = {
  Mutation: {
    register: async (
      _,
      {registerInput: {email, username, password, confirmPassword}}
    ) => {
      const {errors,valid}=registerInputValidate(email,username,password,confirmPassword);
      if(!valid) {
        throw new UserInputError("Errors",{errors});
      }
      const user = await User.findOne({username});
      if (user) {
        throw new UserInputError('username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      const result = await newUser.save();

      const token = generateToken(result);

      return {...result._doc, id: result.id, token};
    },

    login:async(_,{username,password})=>{
      const {errors,valid}=loginInputValidate(username,password);
      
      if(!valid) {
        throw new UserInputError("Errors",{errors})
      }
      const user=await User.findOne({username});
      if(!user) {
        errors.general="User not Found";
        throw new UserInputError("User not found",{errors})

      }

      const isPasswordCorrect=await bcrypt.compare(password,user.password);
      if(!isPasswordCorrect) {
        errors.general="Wrong credentials";
        throw new UserInputError("Wrong Credentials",{errors})
      }

      const token=generateToken(user);

      return {...user._doc,id:user.id,token}

      
    }
  },
};
