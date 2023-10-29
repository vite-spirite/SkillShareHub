import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput{
    @Field()
    body: string;
    @Field()
    articleId: number;
}