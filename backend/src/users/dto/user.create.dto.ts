import { User } from "../entity/user.entity";
import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString, Min, MinLength } from "class-validator";

@InputType()
export class UserCreateDto implements Partial<User> {
    @Field()
    @IsString()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(6)
    password: string;

    @Field({nullable: true, defaultValue: null})
    @IsOptional()
    avatar: string;

    @Field({nullable: true, defaultValue: null})
    @IsOptional()
    banner: string;

    @Field()
    @MinLength(6)
    confirmPassword: string;
}