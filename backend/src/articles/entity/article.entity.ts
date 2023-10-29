import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "src/users/entity/user.entity";
import { Topic } from "src/topic/entity/topic.entity";
import { Comment } from "src/comment/entity/comment.entity";
import { CommentPaginate } from "src/comment/dts/comment.paginate.dto";

@ObjectType()
@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({unique: true})
    uid: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    content: string;

    @Field(type => User)
    @ManyToOne(type => User, user => user.articles)
    author: User;

    @Field()
    @Column()
    published: boolean = false;

    @Column()
    authorId: number;

    @ManyToMany(() => Topic)
    @JoinTable()
    @Field(type => [Topic])
    topics: Topic[];

    @OneToMany(() => Comment, comment => comment.article)
    @Field(type => [Comment])
    comments: Comment[];

    @Field(() => CommentPaginate)
    commentsPaginate: CommentPaginate;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    upadtedAt: Date;

    @Field({nullable: true})
    @Column({nullable: true})
    publishedAt: Date;
}