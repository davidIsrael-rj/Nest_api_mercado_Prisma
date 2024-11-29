import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class IdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        const dt = Date.now();
        console.log('\nUserIdCheckMiddleware Antes')
        if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
            throw new BadRequestException('ID inválido!');
        }
        console.log(`Execução levou: ${Date.now() - dt} milisegundos`);
        console.log('UserIdCheckMiddleware Depois\n')

        next();
    }

}