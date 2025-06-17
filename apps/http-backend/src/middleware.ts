import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req:Request , res:Response, next:NextFunction){
    const token = req.headers["authorization"] ?? "";
    const secreat = JWT_SECRET;

    if(!secreat){
        throw new Error("JWT is not defined.");
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    if(decoded){
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json({
            message: "Unuthorised, access denied"
        })
    }
}