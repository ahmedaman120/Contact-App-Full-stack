import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  constructor() {
    this.socket = io(environment.apiUrl);
  }

  emit(event: string, data: any){
    console.log(`emit ${event }, ${data}`)
    this.socket.emit(event, data);
  }

  on(event: string){
    return new Observable((observer)=>{
      this.socket.on(event, (data)=>{
        observer.next(data);
      });

      return ()=>{
        this.socket.off();
      };
    })
  }
}
