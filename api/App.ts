import express from 'express';
import cookieParser from 'cookie-parser';
import productRouter from '../routers/product';
import connectToDatabase from './connection';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import userRouter from '../routers/user';
export default class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(helmet());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.routes();
    }

    private routes(): void {
        this.app.use('/product', productRouter);
        this.app.use('/user', userRouter);
    }

    public startServer(port: string | number): void {
        connectToDatabase()
        this.app.listen(port, (): void => {
            console.log(`Server running on port ${port}`);
        })
    }

    public getApp(): express.Application {
        return this.app;
    }
}