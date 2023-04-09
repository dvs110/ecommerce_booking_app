import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return next(createError(401, "you are not authenticated"))
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return next(createError(403, "token not valid"));
        req.userz = user;//setting new property of req 
        next();
    })
}
//userz includes id and isAdmin 

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.userz.id === req.params.id || req.userz.isAdmin) {
            next();
        } else {
            return next(createError(403, "not autherized"));
        }
    }
    )
}
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.userz.isAdmin) {
            next();
        } else {
            return next(createError(403, "not autherized"));
        }
    }
    )
}