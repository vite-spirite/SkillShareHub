import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { ArticlesModule } from 'src/articles/articles.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ArticlesModule
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController]
})
export class UsersModule {}
