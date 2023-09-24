import { User } from "../entity/user.entity";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UserCreateDto implements Partial<User> {
    @Field()
    name: string;
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    confirmPassword: string;
}