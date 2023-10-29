import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthJwtGuard } from 'src/auth/guards/auth.jwt.guard';
import { UseGuards } from '@nestjs/common';
import { CreateCommentInput } from './dts/comment.create.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entity/user.entity';
import { Comment } from './entity/comment.entity';
import { CommentPaginate } from './dts/comment.paginate.dto';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthJwtGuard)
  @Mutation(() => Comment)
  async createComment(@Args('comment') comment : CreateCommentInput, @CurrentUser() user: User): Promise<Comment> {
    return await this.commentService.createComment(user, comment.articleId, comment.body);
  }

  @Query(() => CommentPaginate)
  async commentsPaginate(@Args('articleId') articleId: number, @Args('page') page: number): Promise<CommentPaginate> {
    return await this.commentService.paginateComments(articleId, page, 10);
  }
}
