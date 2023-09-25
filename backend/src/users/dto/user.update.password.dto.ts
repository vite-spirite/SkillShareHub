import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class UserUpdatePasswordDto {
    @Field()
    password: string;
    @Field()
    newPassword: string;
    @Field()
    newPasswordConfirm: string;
}