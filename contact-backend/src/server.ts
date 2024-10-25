import http from 'http';
import { App } from './app';
import env from 'dotenv';
import { SocketHandler } from './handler/socket.handler';
env.config()
const PORT= process.env.PORT;
const startServer = async ()=>{
    const server = http.createServer(await new App().getApp());
    new SocketHandler(server);
    server.listen(PORT, ()=>{
        console.log(`Server is up and running on Port ${PORT}`);
    })
}

startServer();