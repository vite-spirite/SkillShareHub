import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { User } from '../users/entity/user.entity';
import { UserCreateDto } from 'src/users/dto/user.create.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
    private passwordRegex: RegExp;

    constructor(private userService: UsersService) {
        this.passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&éèà.])[A-Za-z\d@$!%*?&éèà.]{6,}$/;
    }

    async login(credentials: AuthCredentialDto): Promise<User|null> {
        return await this.userService.findOneByCredentials(credentials.email, credentials.password);
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
