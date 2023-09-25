import User from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const register = async(req, res)=>{
    const {username, email , password} = req.body
   try {
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password, salt)
       const newUser = await new User({
           username,
           email,
           password : hashedPassword
       })
       await newUser.save()
       res.status(200).json(newUser)
   } catch (error) {
      res.status(500).json(error)
   }
}

export const login = async(req, res)=>{
    const {email} = req.body
   try {
       const user = await User.findOne({email : email})
       if(!user) return res.status(400).json({message : "email not found"})
       
       let passwordCheck = await bcrypt.compare(req.body.password , user.password)       
       if(!passwordCheck) return res.status(403).json({message : "password not matching"})
       
       const token =  jwt.sign( {id : User._id} , process.env.secretkey) 
       const {password , ...others} = user._doc
       res.cookie("accesstoken", token, {
         httpOnly : true
       }).status(200).json(others)
   } catch (error) {
      res.status(500).json(error)
   }
}

