import express, { Router } from 'express';
import productRouter from '../routers/product';
import csrf from 'csrf';
import connectToDatabase from './connection';

export default class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.disable('x-powered-by');
        this.app.use(express.json());
        this.csrfProtection();
        this.routes();
        
    }

    private routes(): void {
        this.app.use('/product', productRouter);
    }

    private csrfProtection(): void {
        const tokens = new csrf();
        const secret = tokens.secretSync();
        const token = tokens.create(secret);
        this.app.use((_req, res, next) => {
            res.cookie('XSRF-TOKEN', token);
            next();
        });
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