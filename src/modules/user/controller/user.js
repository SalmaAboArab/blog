import { query } from "express";
import blogModel from "../../../../DB/model/Blog.model.js";
import usermodel from "../../../../DB/model/User.model.js"
import jwt from "jsonwebtoken"
import { hash } from "../../../utils/HashAndCompare.js";




export const updateuser=async(req,res,next)=>{        //update user
   try {
   const {age} = req.body;
   const user=await usermodel.updateOne({_id:req.user.id},{age:age})
   return user.modifiedCount? res.json({ message: "Done",user }):res.json({ message: "Invalid_ID" })
   } catch (error) {
    return res.json({message: "Catch error",error})
   }
}

export const deleteuser=async(req,res,next)=>{           //delete user
    try {
    const user=await usermodel.deleteOne({_id:req.user.id})
    return user.deletedCount? res.json({ message: "Done",user }):res.json({ message: "Invalid_ID" })
    } catch (error) {
        return res.json({message: "Catch error",error})
    }
 }

 export const userData=async(req,res,next)=>{
    try {
        const user=await usermodel.findOne({_id:req.user.id});
        return res.json({message:"Done",user})
    } catch (error) {
        return res.json({message: "Catch error",error})
    }
 }

 export const updatePassword=async(req,res,next)=>{
    try {
        const {password} = req.body;
        const hashValue=hash({plaintext:password,saltRound:9})
        const user=await usermodel.updateOne({_id:req.user.id},{password:hashValue})
        return user.modifiedCount? res.json({ message: "Done",user }):res.json({ message: "Invalid_ID" })
    } catch (error) {
        return res.json({message: "Catch error",error})
    }
 }

 export const profile=async(req,res,next)=>{
    try {
        const user =await usermodel.findById(req.user._id)
        const bloges=await blogModel.find({userId:req.user.id})
        return res.json({message:"User Module",data:{user,bloges}})
    } catch (error) {
        return res.json({message: "Catch error",error})
    }
 }

 export const getallusers=async (req,res,next)=>{               //get all users
    try {
        const users=await usermodel.find().select("-password");
    return res.json({ message: "Done",users })
    } catch (error) {
        return res.json({message: "Catch error",error})
    }
 }
