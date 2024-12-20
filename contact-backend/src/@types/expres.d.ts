import { Request } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: {
                user: string;
                id: string;
            };
        }
    }
}