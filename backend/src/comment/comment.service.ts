import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
    import {Comment} from './entity/comment.entity';
import { User } from 'src/users/entity/user.entity';
import { ArticlesService } from 'src/articles/articles.service';
import { CommentPaginate } from './dts/comment.paginate.dto';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
        @Inject(forwardRef(() => ArticlesService)) private readonly articleService: ArticlesService
    ) {}

    async createComment(user: User, articleId: number, body: string): Promise<Comment> {

        const article = await this.articleService.findOne(articleId);

        if(!article) {
            throw new Error('Article not found');
        }

        const comment = new Comment();

        comment.user = user;
        comment.article = article;
        comment.body = body;

        return await this.commentRepository.save(comment);
    }

    async paginateComments(articleId: number, page: number, perPage: number): Promise<CommentPaginate> {
        const total = await this.commentRepository.count({where: {article: {id: articleId}}});
        const comments = await this.commentRepository.find({
            where: {article: {id: articleId}},
            order: {createdAt: 'DESC'},
            skip: (page - 1) * perPage,
            take: perPage,
            relations: ['user']
        });

        return {
            data: comments,
            total: total,
            cursor: page,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < Math.ceil(total / perPage) ? page + 1 : null,
            firstPage: 1,
            lastPage: Math.ceil(total / perPage),
        }
    }

    async delete(id: number): Promise<boolean> {
        const comment = await this.commentRepository.findOne({where: {id}});

        if(!comment) {
            throw new Error('Comment not found');
        }

        await this.commentRepository.remove(comment);

        return true;
    }

}
