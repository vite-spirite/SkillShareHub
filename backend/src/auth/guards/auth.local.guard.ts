import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialDto } from '../dto/auth.credential.dto';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const {req} = ctx.getContext();
        req.body = (ctx.getArgs() as {credentials: AuthCredentialDto}).credentials;
        return req;
    }
}