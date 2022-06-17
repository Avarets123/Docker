import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TypeExpReq } from "../interfaces/req-express.type";


@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
    
        const req = context.switchToHttp().getRequest<TypeExpReq>();

        if (req.user) {
            return true;
        }


        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);

    }
}