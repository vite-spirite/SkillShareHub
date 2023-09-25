import { Field, InputType } from "@nestjs/graphql";
import { UserUpdatePasswordDto } from "./user.update.password.dto";

@InputType()
export class UserUpdateDto {
    @Field(() => UserUpdatePasswordDto, {nullable: true})
    password?: UserUpdatePasswordDto;

    @Field({nullable: true})
    name?: string;

    @Field({nullable: true})
    bio?: string;
}