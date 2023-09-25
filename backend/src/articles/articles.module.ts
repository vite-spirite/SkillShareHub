import { Module, forwardRef } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesResolver } from './articles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    forwardRef(() => UsersModule)
  ],
  providers: [ArticlesResolver, ArticlesService],
  exports: [ArticlesService, TypeOrmModule]
})
export class ArticlesModule {}