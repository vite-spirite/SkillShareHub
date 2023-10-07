import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsString, MaxLength, isString } from "class-validator";

@InputType()
export class ArticleCreateDto {
    @Field()
    @IsString()
    title: string;

    @Field()
    @IsString()
    content: string;

    @Field()
    @IsBoolean()
    published: boolean;

    @Field(type => [String])
    @MaxLength(20, {each: true})
    topics: string[];
}