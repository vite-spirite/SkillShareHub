import { Field, ObjectType } from "@nestjs/graphql";
import { Comment } from "../entity/comment.entity";

@ObjectType()
export class CommentPaginate {
    @Field(() => [Comment])
    data: Comment[];

    @Field()
    cursor: number;
    @Field()
    prevPage: number;
    @Field()
    nextPage: number;
    @Field()
    lastPage: number;
    @Field()
    firstPage: number;
    @Field()
    total: number;
}