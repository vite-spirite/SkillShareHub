import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { nanoid } from "nanoid";
import { Article } from "src/articles/entity/article.entity";

@ObjectType()
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    @Field()
    uid: string = nanoid(12);

    @Column()
    @Field()
    name: string;

    @Column({nullable: true, default: null})
    @Field({nullable: true})
    bio: string;
    
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Field({nullable: true})
    @Column({nullable: true})
    avatar: string;

    @Field({nullable: true})
    @Column({nullable: true})
    banner: string;

    @Field(() => [Article])
    @OneToMany(() => Article, article => article.author)
    articles: Article[];

    @CreateDateColumn()
    @Field()
    createdAt: Date;
    @UpdateDateColumn()
    @Field()
    updatedAt: Date;
}