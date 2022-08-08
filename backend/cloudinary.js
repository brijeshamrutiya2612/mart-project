import cloudinaryModule from "cloudinary";
import dotenv from 'dotenv'

dotenv.config();
const cloudinary = (cloudinaryModule).v2;

cloudinary.config({
  cloud_name: 'shoppingmartapp',
  api_key: '965393881938217',
  api_secret: 'bfmnAyaMfki2pYIp6tq01WBXuKw',
});

// module.exports = cloudinary
export default cloudinary