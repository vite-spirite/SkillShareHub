import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn} from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/entity/user.entity";

@Entity()
@ObjectType()
export class Topic {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;
    
    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    identifier: string;

    @ManyToOne(() => User, user => user.topics)
    @Field(type => User)
    createdBy: User;

    @Column()
    createdById: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;
}