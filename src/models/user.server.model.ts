import { Schema, Model, model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export var UserSchema: Schema = new Schema({
    created: Date,
    email: String,
    password: String,
    firstName: String,
    lastName: String
});

UserSchema.pre('save', function (next) {
    if (!this.created) {
        this.created = new Date();
    }
    next();
});

export const User: Model<IUser> = model<IUser>('UserSchema', UserSchema);
