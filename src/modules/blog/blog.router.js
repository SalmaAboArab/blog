import {Router} from 'express'
import * as blogController from  './controller/blog.js'
import auth from '../../middleware/auth.js';
const router = Router();


router.post("/addblog" ,auth, blogController.addblog)
router.patch("/update/:blogid" , auth,blogController.updateblog)
router.delete("/delete/:blogid" ,auth, blogController.deleteblog)
router.get("/getAllblogs" , blogController.getAllblogs)
router.get("/getblogById/:id" , blogController.getblogById)


export default  router