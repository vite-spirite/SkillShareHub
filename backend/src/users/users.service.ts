import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
    
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(uid: string): Promise<User|null> {
        return await this.usersRepository.findOne({where: {uid}});
    }

    async create(data: UserCreateDto): Promise<User> {
        const user = this.usersRepository.create(data);
        await this.usersRepository.save(user);
        return user;
    }

    async findOneByCredentials(email: string, password: string): Promise<User|null> {
        const user = await this.usersRepository.findOne({where: {email}});

        if (!user) {
            return null;
        }

        const isPasswordValid = await this.comparePassword(password, user.password);
        
        if(isPasswordValid) {
            return user;
        }

        return null;
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return argon2.verify(hash, password);
    }
}
