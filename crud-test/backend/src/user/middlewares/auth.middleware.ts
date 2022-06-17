import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { TypeExpReq } from "../interfaces/req-express.type";
import { verify} from 'jsonwebtoken'
import { myJwtSecret } from "@app/jwtsecret";
import { UserService } from "../user.service";


@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor (private readonly userService: UserService){}


    async use(req: TypeExpReq, res: Response, next: NextFunction) {
        
        if (!req.headers.authorization) {
            req.user = null;
            next();
            return;

        }


        const token = req.headers.authorization.split(' ')[1];


        try {
            const dataToken = verify(token, myJwtSecret);
            //@ts-ignore
            const user = await this.userService.findById(dataToken.id);
            req.user = user;
            next();
            
        } catch (error) {
            req.user = null;
            next();
        }

    }
}