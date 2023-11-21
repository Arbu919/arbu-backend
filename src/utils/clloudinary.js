import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
   
cloudinary.config({ 
  cloud_name: 'process.env.CLOUDINARY_CLOUD_KEY', 
  api_key: 'process.env.CLOUDINARY_API_KEY', 
  api_secret: 'process.env.CLOUDINARY_API_SECRET' 
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if (!localFilePath) return null;
        // Upload file on Cloudinary server
        const responce = await cloudinary.uploader.upload(localFilePath,
        {
            resource_type: "auto"
        })
        // File uploaded successfully
        console.log(" :: File uploaded successfully on Cloudinary :: ", responce.url);
        return responce
    } catch (error) {
        fs.unlinkSync(localFilePath) // Delete temporary file saved in localStorage as file upload got failed 
        return null;
    }
}

export { uploadOnCloudinary }
// Now no need of this 
// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });