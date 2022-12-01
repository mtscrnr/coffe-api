import { Request, Response } from "express";
import { User } from "../interfaces/User";
import UserService from "../services/User";
import Controller, { RequestWithBody, ResponseError } from "./Controller";

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
            const data = await this.user.create(req.body);
            if('error' in data) return res.status(400).json(data);
            return res.status(201).json(data);
        } catch (error) {
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
}