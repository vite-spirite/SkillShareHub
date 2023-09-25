import {Injectable} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';


@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);

        const {req} = ctx.getContext();
        return req;
    }
}