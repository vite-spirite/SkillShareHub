import { ObjectType, Field } from "@nestjs/graphql";
import { Article } from "../entity/article.entity";

@ObjectType()
export class ArticlePaginate {
    @Field()
    total: number;
    @Field()
    page: number;
    @Field()
    perPage: number;
    @Field(() => [Article])
    articles: Article[]
}