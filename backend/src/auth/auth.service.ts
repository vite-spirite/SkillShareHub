import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { User } from '../users/entity/user.entity';
import { UserCreateDto } from 'src/users/dto/user.create.dto';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { AuthTokenDto } from './dto/auth.token.dto';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
    private passwordRegex: RegExp;

    constructor(
        private userService: UsersService,
        private configService: ConfigService,
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cache: CacheStore
    ) {
        this.passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&éèà.])[A-Za-z\d@$!%*?&éèà.]{6,}$/;
    }

    async login(credentials: AuthCredentialDto): Promise<User|null> {
        return await this.userService.findOneByCredentials(credentials.email, credentials.password);
    }

    async setStoreRefreshIteration(userId: number): Promise<number> {
        const refreshIteration = await this.cache.get<number>(`user:${userId}:refresh`);
        
        const iter = refreshIteration ? refreshIteration + 1 : 1;
        await this.cache.set(`user:${userId}:refresh`, iter);
        return iter;
    }

    async getStoreRefreshIteration(userId: number): Promise<number> {
        return await this.cache.get<number>(`user:${userId}:refresh`);
    }

    async generateAuthToken(user: User): Promise<AuthTokenDto> {
        const {password, ...userWithoutPassword} = user;
        const iter = await this.setStoreRefreshIteration(user.id);

        return {
            access_token: await this.jwtService.signAsync({...userWithoutPassword}, {expiresIn: '15m', secret: this.configService.get<string>('ACCESS_TOKEN_SECRET')}),
            refresh_token: await this.jwtService.signAsync({id: user.id, iter}, {expiresIn: '30d', secret: this.configService.get<string>('REFRESH_TOKEN_SECRET')})
        }
    }

    async refresh(token: string) : Promise<string> {
        const payload = await this.jwtService.verifyAsync(token, {secret: this.configService.get<string>('REFRESH_TOKEN_SECRET')});

        const iter = await this.getStoreRefreshIteration(payload.id);

        if(iter !== payload.iter) {
            throw new BadRequestException('Invalid token');
        }

        const user = await this.userService.findOneById(payload.id);

        if(!user) {
            throw new BadRequestException('Invalid token');
        }

        const {password, ...userWithoutPassword} = user;

        return await this.jwtService.signAsync({...userWithoutPassword}, {expiresIn: '15m', secret: this.configService.get<string>('ACCESS_TOKEN_SECRET')})
    }

    async register(credentials: UserCreateDto): Promise<User|null> {

        if(this.passwordRegex.test(credentials.password) === false) {
            throw new BadRequestException('Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character');
        }

        if(credentials.password !== credentials.confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        const {confirmPassword, password, ...user} = credentials;
        const hash = await argon2.hash(password);

        return await this.userService.create({...user, password: hash, confirmPassword: hash});
    }

}
