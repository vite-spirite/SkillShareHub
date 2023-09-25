import { InputType, Field } from "@nestjs/graphql";
import {IsEmail, MinLength} from 'class-validator'


@InputType()
export class AuthCredentialDto {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(6)
    password: string;
}