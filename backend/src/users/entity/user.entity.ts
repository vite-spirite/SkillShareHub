import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { nanoid } from "nanoid";

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
    
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    @Field()
    createdAt: Date;
    @UpdateDateColumn()
    @Field()
    updatedAt: Date;
}