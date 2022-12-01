import express, { Router } from 'express';
import productRouter from '../routers/product';
import connectToDatabase from './connection';

export default class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.disable('x-powered-by');
        this.app.use(express.json());
        this.routes();
    }

    public routes(): void {
        this.app.use('/product', productRouter);
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