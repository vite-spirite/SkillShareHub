import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';

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
}
