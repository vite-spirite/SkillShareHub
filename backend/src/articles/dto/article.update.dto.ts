import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ArticleUpdateDto {
    @Field()
    title?: string;
    @Field()
    content?: string;
    @Field()
    published?: boolean;
}