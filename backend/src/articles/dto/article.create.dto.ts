import { Field, InputType } from "@nestjs/graphql";
import { Article } from "../entity/article.entity";

@InputType()
export class ArticleCreateDto implements Partial<Article> {
    @Field()
    title: string;
    @Field()
    content: string;
    @Field()
    published: boolean;
}