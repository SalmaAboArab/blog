import {Router} from 'express'
import * as userController from  './controller/user.js'
import auth from '../../middleware/auth.js';
const router = Router();


// router.get("/" , userController.getUserModule)
router.patch("/update" ,auth, userController.updateuser)  //patch  or put
router.delete("/delete" ,auth, userController.deleteuser)
router.get("/userData",auth,userController.userData)
router.patch("/updatePassword",auth,userController.updatePassword)
router.get("/",userController.getallusers)
router.get("/profile",auth,userController.profile)




export default  router