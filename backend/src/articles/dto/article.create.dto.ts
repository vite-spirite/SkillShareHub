import { Field, InputType } from "@nestjs/graphql";
import { Article } from "../entity/article.entity";
import { IsBoolean, IsString } from "class-validator";

@InputType()
export class ArticleCreateDto implements Partial<Article> {
    @Field()
    @IsString()
    title: string;
    @Field()
    @IsString()
    content: string;
    @Field()
    @IsBoolean()
    published: boolean;
}