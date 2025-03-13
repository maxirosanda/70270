import { Request, response,NextFunction } from "express";
import { NestMiddleware } from "@nestjs/common";

export class FirstMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`${req.method} at ${req.url} received`);
        next();
    }
}