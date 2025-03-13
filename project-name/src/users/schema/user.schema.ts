import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: true })
    firstName: string;

    @Prop({required: true})
    lastName: string;

    @Prop()
    age: number;

    @Prop({required: true,unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);