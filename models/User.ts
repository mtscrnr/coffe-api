import { Document, Schema, model as createModel } from 'mongoose';
import { User } from '../interfaces/User';
import MongoModel from './Model';

interface UserDocument extends User, Document {}

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
    role: { type: String, required: true, default: 'user' },
});

export default class UserModel extends MongoModel<User> {
    constructor(
        public model = createModel<UserDocument>('Users', UserSchema)
    ) {
        super(model);
    }
}
