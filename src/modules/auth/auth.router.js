import {Router} from 'express'
import * as authController from  './controller/auth.js'
const router = Router();


router.get("/" , authController.getAuthModule)

router.post("/signup",authController.signup)
router.post("/login",authController.login)
export default  router