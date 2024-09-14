// src/types/express.d.ts
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            userId?: string; // or string if it's required
        }
    }
}
