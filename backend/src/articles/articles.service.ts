import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';
import { ArticleCreateDto } from './dto/article.create.dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { ArticlePaginate } from './dto/article.paginate.dto';

import slugify from 'slugify';
import { nanoid } from 'nanoid';
import { TopicService } from 'src/topic/topic.service';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article) private articlesRepository: Repository<Article>,
        @Inject(forwardRef(() => UsersService)) private userService: UsersService,
        private topicService: TopicService,
        @Inject(forwardRef(() => CommentService)) private readonly commentService: CommentService) {}

    async findAll(page: number): Promise<ArticlePaginate> {
        const total = await this.articlesRepository.count({where: {published: true}, select: ['id']});
        const perPage = 15;

        const articles = await this.articlesRepository.find({
            where: {published: true},
            order: {publishedAt: 'DESC'},
            skip: (page - 1) * perPage,
            take: perPage
        });

        return {
            articles,
            total: Math.ceil(total / perPage),
            page,
            perPage
        }
    }

    async findOne(id: number): Promise<Article|null> {
        return await this.articlesRepository.findOne({where: {id}});
    }

    async findByAuthorId(authorId: number): Promise<Article[]> {
        return await this.articlesRepository.find({where: {author: {id: authorId}}});
    }

    async create(data: ArticleCreateDto, user: User): Promise<Article> {
        const partial: Partial<Article> = {
            title: data.title,
            content: data.content,
            published: data.published || false,
        };

        if(data.topics) {
            const topics = await Promise.all(data.topics.map(async topic => {
                return await this.topicService.findOrCreate(topic, user.id);
            }));
            console.log(topics);

            partial.topics = topics;
        }

        if(data.published) {
            partial.publishedAt = new Date();
        }

        partial.uid = slugify(data.title + ' ' + nanoid(8), {lower: true})

        const article = this.articlesRepository.create({...partial, authorId: user.id});
        await this.articlesRepository.save(article);
        return article;
    }

    async findAuthor(authorId: number): Promise<User> {
        return await this.userService.findOneById(authorId);
    }

    async findTopics(articleId: number): Promise<any> {
        return (await this.articlesRepository.findOne({where: {id: articleId}, relations: ['topics'], select: ['topics']})).topics;
    }

    async commentPaginate(articleId: number, page: number): Promise<any> {
        return await this.commentService.paginateComments(articleId, page, 10);
    }
}
