import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, {nullable: true})
  async user(@Args('uid') uid: string): Promise<User|null> {
    return this.usersService.findOne(uid);
  }
}
