import { User, userSchema } from "../interfaces/User";
import UserModel from "../models/User";
import Service, { ServiceError } from "./Service";
import bcrypt from 'bcrypt';

export default class UserService extends Service<User> {
    constructor(model = new UserModel()) {
        super(model);
    }

    public async create(obj: User): Promise<User | ServiceError> {
        const parsed = userSchema.safeParse(obj);
        if (!parsed.success) return {
            error: parsed.error
        };
        return this.model.create(obj);
    }

    public async update(id: string, obj: User): Promise<User | null  | ServiceError> {
        return this.model.update(id, obj);
    }   

    public async login(email: string, password: string): Promise<User | null> {
        const user = await this.model.findByEmail(email);
        if (!user) return null;
        const passwordDecoded = await bcrypt.compare(password, user.password!);
        if (!passwordDecoded) return null;
        return user;
    }

}