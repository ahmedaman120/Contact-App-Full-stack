import express, { Application } from "express";
import { Routes } from "./routes/routes";
import { DB } from "./db/_db";
import cors from 'cors';
export class App {
    private app: Application;
    private Routes: Routes = new Routes();

    constructor(){
        this.app = express();
        this.initApp();
    }

    public async getApp(): Promise<Application>{
        return await this.app;
    }
    private async  initApp(){
        this.app.use(express.json({limit: '512kb'}));
        this.app.use(cors({
            origin: "*"
        }))
        await DB.connect();
        this.Routes.configration(this.app);

    }
}