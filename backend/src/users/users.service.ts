import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import * as argon2 from 'argon2';
import { rmSync } from 'fs';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
    
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(uid: string): Promise<User|null> {
        return await this.usersRepository.findOne({where: {uid}});
    }

    async findOneById(id: number): Promise<User|null> {
        return await this.usersRepository.findOne({where: {id}});
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

    async updateAvatar(id: number, avatar: string): Promise<User> {
        const user = await this.findOneById(id);

        if(user.avatar) {
            rmSync(`./uploads/avatars/${user.avatar}`);
        }

        user.avatar = avatar;
        await this.usersRepository.save(user);
        return user;
    }

    async updateBanner(id: number, banner: string): Promise<User> {
        const user = await this.findOneById(id);

        if(user.banner) {
            rmSync(`./uploads/banner/${user.banner}`);
        }

        user.banner = banner;
        await this.usersRepository.save(user);
        return user;
    }
}
