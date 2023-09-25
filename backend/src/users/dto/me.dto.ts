import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entity/user.entity";

@ObjectType()
export class MeDto extends User {
    @Field()
    email: string;
}