import { Resolver, Query, ResolveField, Parent, Args, Mutation } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article } from './entity/article.entity';
import { User } from 'src/users/entity/user.entity';
import { ArticlePaginate } from './dto/article.paginate.dto';
import { ArticleCreateDto } from './dto/article.create.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthJwtGuard } from 'src/auth/guards/auth.jwt.guard';
import { UseGuards } from '@nestjs/common';
import { Topic } from 'src/topic/entity/topic.entity';

@Resolver(of => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) {}

  @Query(() => ArticlePaginate)
  async articles(@Args('page') page: number): Promise<ArticlePaginate> {
    return await this.articlesService.findAll(page);
  }

  @UseGuards(AuthJwtGuard)
  @Mutation(() => Article)
  async create(@Args('article') article: ArticleCreateDto, @CurrentUser() user: User): Promise<Article> {
    return await this.articlesService.create(article, user);
  }

  @ResolveField('author', returns => User)
  async author(@Parent() article: Article) {
    return this.articlesService.findAuthor(article.authorId);
  }

  @ResolveField('topics', returns => [Topic])
  async topics(@Parent() article: Article) {
    return this.articlesService.findTopics(article.id);
  }
}
