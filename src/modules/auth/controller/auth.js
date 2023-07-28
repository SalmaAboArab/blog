import usermodel from "../../../../DB/model/User.model.js";
import { compare, hash } from "../../../utils/HashAndCompare.js";
import  jwt  from "jsonwebtoken";
import { generateToken } from "../../../utils/GenerateAndVerifyToken.js";
import { signupSchema } from "../auth.validation.js";

export const getAuthModule =   (req, res, next) => {

    return res.json({ message: "Auth module" })
}

export const signup=async (req,res,next)=>{                 //sign up
   try{
    const validationResult=signupSchema.validate(req.body,{abortEarly:false})
    if(validationResult?.error){
        return res.json({messge:"Validation error",validationResult})
    }
    const {username,email,password,age}=req.body;    
    // console.log({username,email,password});
    // if(password!=cpassword){                     //بدلنا الجزء ده ب joi
    //     return res.json({message:"Password mismatch cpassword"});
    // }
    const checkUser=await usermodel.findOne({email});
    if(checkUser){
        return res.json({message:"Email Exist"});
    }
    const hashValue=hash({plaintext:password,saltRound:9})
    const user=await usermodel.create({username,email,password:hashValue,age})  //to save
    return res.json({message:"Done",user});


   }catch(error){

    return res.json({message: "Catch error",error,stack:error.stack})
   }
}

export const login=async (req,res,next)=>{                         //sign in
    try {
        const {email,password}=req.body;
    const user=await usermodel.findOne({email})//.select("username")
    if(!user){
        return res.json({message:"In valid email"})
    }
    const match=compare({plaintext:password,hashValue:user.password})
    if(!match){
        return res.json({message:"In valid password"})
    }
    // const token=jwt.sign({id:user._id,isLoggedIn:true},process.env.TOKEN_SIGNATURE,{expiresIn:60*60*24*30})  // {payload , signature},expire time
    const token=generateToken({
        payload:{id:user._id,isLoggedIn:true},
        expiresIn:60*60*24*30
    })
    return res.json({message:"Done",token})
    } catch (error) {
        return res.json({message: "Catch error",error,stack:error.stack})
    }
}