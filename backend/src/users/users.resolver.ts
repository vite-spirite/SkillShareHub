import { Mutation, Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { Article } from 'src/articles/entity/article.entity';

@Resolver(of => User)
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

  @ResolveField('articles', returns => [Article])
  async articles(@Parent() user: User) {
    return this.usersService.getArticles(user.id);
  }
}
