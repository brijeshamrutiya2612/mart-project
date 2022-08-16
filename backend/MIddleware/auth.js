import { ErrorHandler } from "../utils/errorhader";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";


export const isAuthenticatedUser = expressAsyncHandler(async (req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to access this Resource",401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decodedData.id);

    next();
})