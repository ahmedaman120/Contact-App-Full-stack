import { Server } from "http";
import {Server as SocketIoServer, Socket } from "socket.io"
import { ISocketMsgUpdateContact } from "../interfaces/update-socket-msg.interface";
export class SocketHandler{
    io: SocketIoServer;

    constructor(server: Server){
        this.io = new SocketIoServer(server, {
            cors: {
              origin: '*',
            }
          });

        this.io.on("connect",(socket: Socket)=>{
            console.info(`There is Client to socket ${socket.handshake.address}`);

            socket.on("disconnect", (reason)=>{
                console.log(`Client with socket id ${socket.id} is disconnected`)
            });

            socket.on("update", (data: string)=>{
                const contactId: ISocketMsgUpdateContact = JSON.parse(data);
                this.io.sockets.emit("update-status",JSON.stringify({id: contactId.id, status: false}));
            });

            socket.on("finished" , (data: string)=>{
                const contactId: ISocketMsgUpdateContact = JSON.parse(data);
                this.io.sockets.emit("update-status",JSON.stringify({id: contactId.id, status: true}));
            })
        })
    }
}