import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';
import { ArticlesService } from 'src/articles/articles.service';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => ArticlesModule),
  ],
  providers: [CommentResolver, CommentService],
  exports: [TypeOrmModule, CommentService]
})
export class CommentModule {}
