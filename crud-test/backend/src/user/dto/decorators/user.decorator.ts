import { TypeExpReq } from "@app/user/interfaces/req-express.type";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<TypeExpReq>();

    if (!req.user) {
        return null;
    }

    if (data) {
        return req.user[data]
    }

    return req.user;

});