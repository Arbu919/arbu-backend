import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name : "avatar", // this is the place same will be in frontend name
            maxCount : 1
        },
        {
            name : "coverImg",
            maxCount:  1
        }
    ]),
    registerUser
)



export default router;
