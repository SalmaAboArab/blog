import jwt from 'jsonwebtoken'
import usermodel from '../../DB/model/User.model.js';
import { verifyToken } from '../utils/GenerateAndVerifyToken.js';

const auth=async (req,res,next)=>{
    try {
        const {authorization} =req.headers
        console.log({authorization});
        console.log(authorization?.startsWith(process.env.BARRER_KEY ));
        if(!authorization?.startsWith(process.env.BARRER_KEY )){
            return res.json({message:"In-valid barrer key"})
        }
        const token=authorization.split(process.env.BARRER_KEY)[1]
        console.log({token});
        if(!token){
            return res.json({message:"Token is required"})
        }
        // const decoded=jwt.verify(token,process.env.TOKEN_SIGNATURE)  // بفك ال token
        const decoded=verifyToken({
            token,
            signature:process.env.TOKEN_SIGNATURE
        });
        console.log({decoded});
        if(!decoded?.id || !decoded?.isLoggedIn){
            return res.json({message:"In-valid token payload"})
        }
        const authUser=await usermodel.findById(decoded.id).select("username email")
        console.log(authUser);
        if(!authUser){
            return res.json({message:"Account not exist"})
        }
        req.user=authUser;  // بخزن فيها بيانات ال user
        return next() // هتنقلك من ملف الrouter لملف ال profile مثلا
    } catch (error) {
        return res.json({message:"Catch Error",err:error?.message})
    }
}
export default auth