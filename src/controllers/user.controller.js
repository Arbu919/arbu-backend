import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/clloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const registerUser = asyncHandler(async (req, res) => {

    // CREATING USER 
    // 1: get user details from front-end based on user.models
    // 2: validation - no empthy 
    // 3: cheak if user already exists : username , 
    // 4: cheak for images, cheak for avatar images
    // 5: upload them to cloudinary, avatar
    // 6: create user object - crete entries in DB
    // 7: remove password and refresh token field from response
    // 8: cheak for user creation
    // 9: resturn res
    // ------------------------------------------------------------
    
    // 1: get user details from front-end based on user.models
    // **all the data we need is avalaible in req.body** - but also we can have data from url 
    const {fullname, username, email, password} = req.body
    console.log("email: " , email) // 1 done 

    // 2: validation - no empthy 
    // if(fullname === ""){
    //     throw new ApiError(400, "fullname is required")
    // } 
    // same code advance 
    if(
        [fullname, username, email, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "all fields are required")
    }

    // 3: cheak if user already exists : username 
    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })
    if(existedUser){
        throw new ApiError (409, "User already exists")
    }

    // 4: cheak for images, cheak for avatar images
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverimgLocalPath = req.files?.coverimg[0]?.path;
    
    if(!avatarLocalPath){
        throw new ApiError (400, "avator file is required")
    }

    // 5: upload them to cloudinary, cheak avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverimg = await uploadOnCloudinary(coverimgLocalPath)
    if(!avatar){
        throw new ApiError (400, "avator file is required")
    }

    // 6: create user object - crete entries in DB
    const user = await User.create({
        name: fullname,
        avator: avatar.url,
        coverimg: coverimg?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // 7: remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    // 8: cheak for user creation
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering User")
    }
    // 9: resturn res
    return res.status(201).json(
        new ApiResponce(200, createdUser, "User Registered Successfully") 
    )


})

export { registerUser }