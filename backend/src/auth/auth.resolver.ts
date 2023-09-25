import { UseGuards, Request } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/entity/user.entity';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { UserCreateDto } from 'src/users/dto/user.create.dto';
import { GqlAuthGuard } from './guards/auth.local.guard';
import { AuthTokenDto } from './dto/auth.token.dto';
import { AuthJwtGuard } from './guards/auth.jwt.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => AuthTokenDto, {nullable: true})
  async login(@Args('credentials') credentials: AuthCredentialDto, @Context() ctx): Promise<AuthTokenDto> {
    return await this.authService.generateAuthToken(ctx.req.user);
  }

  @Mutation(() => User, {nullable: true})
  async register(@Args('user') credentials: UserCreateDto): Promise<User|null> {
    return await this.authService.register(credentials);
  }

  @UseGuards(AuthJwtGuard)
  @Query(() => User)
  async me(@Context() ctx) {
    throw new Error('Resolver not implemented');
  }
}
