import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config()
const authenticateToken = (req: Request, res: Response, next: NextFunction): any => {
    // Get the token from the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({
            status: 401,
            success: false,
            message: "Token is missing",
        });
    }

    // Verify the token
    jwt.verify(token, <string>process.env.JWT_SECRET, (err: any, user: any) => {
      console.log(err)
        if (err) {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "Token is invalid",
            });
        }

        req.user = user;
        next(); 
    });
};

export default authenticateToken;