import { Field, ObjectType } from "@nestjs/graphql";
import { Article } from "src/articles/entity/article.entity";
import { User } from "src/users/entity/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, UpdateDateColumn, CreateDateColumn, Column, OneToOne, JoinColumn } from "typeorm";

@ObjectType()
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => User)
    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Field(type => Article)
    @OneToOne(() => Article)
    @JoinColumn()
    article: Article;

    @Field()
    @Column()
    body: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}