import { Application, Request, Response } from "express";
import { ContactRoutes } from "./contact.routes";
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();


export class Routes{
    private _contactRouter: ContactRoutes = new ContactRoutes()
    private defaultRoute(app: Application){
        app.get("/api", (req: Request, res: Response)=>{
            res.send("success");
        })

        app.post("/api/auth/login", async (req, res) => {
            try {
                const users = [
                    {
                        id: '1',
                        user: 'user1',
                        password: 'user1'
                    },
                    {
                        id: '2',
                        user: 'user2',
                        password: 'user2'
                    }
                ]
              const userBody = req.body;
          
              const { user, password } = userBody;
          
              const isUserExist = users.filter((v)=> v.user == user && v.password==password)[0];
          
              if (!isUserExist) {
                res.status(404).json({
                  status: 404,
                  success: false,
                  message: "User not found",
                });
          return;
              }
          
              const isPasswordMatched =
                isUserExist?.password === password;
          
          
              if (!isPasswordMatched) {
                res.status(400).json({
                  status: 400,
                  success: false,
                  message: "wrong password",
                });
                  return;
              }
          
              const token = jwt.sign(
                { user: isUserExist?.user, id: isUserExist?.id },
                <string>process.env.JWT_SECRET,
                {
                  expiresIn: "1d",
                }
              );
          
              res.status(200).json({
                status: 200,
                success: true,
                message: "login success",
                token: token,
              });
            } catch (error: any) {
              res.status(400).json({
                status: 400,
                message: error.message.toString(),
              });
            }
          });
    }
    public configration(app: Application){
        this.defaultRoute(app)
        this._contactRouter.router(app)
    }
}