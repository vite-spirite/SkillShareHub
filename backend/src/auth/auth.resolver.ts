import { Args, Mutation, Resolver, GqlExceptionFilter } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/entity/user.entity';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { UserCreateDto } from 'src/users/dto/user.create.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, {nullable: true})
  async login(@Args('credentials') credentials: AuthCredentialDto): Promise<User|null> {
    return await this.authService.login(credentials);
  }

  @Mutation(() => User, {nullable: true})
  async register(@Args('user') credentials: UserCreateDto): Promise<User|null> {
    return await this.authService.register(credentials);
  }
}
