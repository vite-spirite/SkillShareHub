import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/entity/user.entity";

import * as dotenv from 'dotenv';
const env = dotenv.config().parsed;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.ACCESS_TOKEN_SECRET,
            ignoreExpiration: false
        });
    }

    async validate(payload: Omit<User, 'password'>): Promise<any> {
        return payload;
    }
}