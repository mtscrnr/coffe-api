import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/User";

const verifyRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction): typeof res | void => {
        const user = req.user as User;
        if (user.role !== role) {
            return res.status(403).json({
                error: 'Forbidden'
            });
        }
        return next();
    }
}

export default verifyRole;
