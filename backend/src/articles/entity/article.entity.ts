import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { nanoid } from "nanoid";
import { type } from "os";
import { User } from "src/users/entity/user.entity";

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