import { User } from "../entity/user.entity";
import { InputType, Field } from "@nestjs/graphql";
import { IsEmail, IsString, Min, MinLength } from "class-validator";

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

    @Field()
    @MinLength(6)
    confirmPassword: string;
}