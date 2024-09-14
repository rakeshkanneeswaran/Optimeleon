import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface CustomRequest extends Request {
    userId?: string; // Make userId optional since it will be added by the middleware
}

function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    const cleanToken = token.replace("Bearer ", "");
    
    try {
        const decoded = jwt.verify(cleanToken, JWT_SECRET) as JwtPayload;
        
        if (!decoded || !decoded.id) {
            return res.status(403).send("Forbidden");
        }
        
        req.userId = decoded.id;
        next(); // Call next() to pass control to the next handler
    } catch (error) {
        return res.status(403).send("Invalid token");
    }
}

export default authMiddleware;
