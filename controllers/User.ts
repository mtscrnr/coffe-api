import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../interfaces/User";
import UserService from "../services/User";
import Token from "../utils/Token";
import Controller, { RequestWithBody, ResponseError } from "./Controller";

type UserWithToken = User & { token: string };

export default class UserController extends Controller<User> {
    private user: UserService;
    
    constructor(
        user: UserService = new UserService()
    ) {
        super(user);
        this.user = user;
    }

    create = async (req: RequestWithBody<User>, res: Response<User | ResponseError> ): Promise<typeof res> => {
        try {
            if (!req.body.password) {
                return res.status(400).json({ error: 'Password is required.' });
            }
            const password = await bcrypt.hash(req.body.password, 10);
            const data = await this.user.create({ ...req.body, password });
            if('error' in data) return res.status(400).json(data);
            const token = new Token().sign({
                _id: data._id,
                email: data.email,
                role: data.role
            });
            res.cookie('token', token, { httpOnly: true });
            return res.status(201).json(data);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'email already exists' });
        }
    }

    readOne = async (req: Request<{ id: string }>, res: Response<User | ResponseError> ): Promise<typeof res> => {
        try {
            const data = await this.user.readOne(req.params.id);
            if(!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: this.errors.internal });
        }
    }

    update = async (req: RequestWithBody<User>, res: Response<User | ResponseError> ): Promise<typeof res> => {
        try {
            const { id } = req.params;
            const data = await this.user.update(id, req.body);
            if (!data) {
                return res.status(404).json({ error: this.errors.notFound });
            }
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: this.errors.internal });
        }
    }

    delete = async (req: Request<{ id: string }>, res: Response<User | ResponseError> ): Promise<typeof res> => {
        try {
            await this.user.delete(req.params.id);
            return res.status(204);
        } catch (error) {
            return res.status(500).json({ error: this.errors.internal });
        }
    }

    login = async (req: RequestWithBody<User>, res: Response<UserWithToken | ResponseError> ): Promise<typeof res> => {
        try {
            const user = await this.user.login(req.body.email, req.body.password!);
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password.' });
            }
            const token = new Token().sign({
                _id: user._id,
                email: user.email,
                role: user.role
            });

            res.cookie('token', token, { httpOnly: true });
            return res.json({
                name: user.name,
                email: user.email,
                role: user.role,
                token
            });
        } catch (error) {
            return res.status(500).json({ error: this.errors.internal });
        }
    }
}