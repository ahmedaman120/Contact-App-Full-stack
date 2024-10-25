import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface Contact {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  status: boolean;
}

export interface ApiResponse {
  data: Contact[];
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getContacts(page: number): Observable<ApiResponse> {
    const headers = this.getAuthHeader()
    return this.httpClient.get<ApiResponse>(`${environment.apiUrl}/api/contacts?page=${page}`, {headers});
  }

  deleteContact(id: string): Observable<ApiResponse> {
    const headers = this.getAuthHeader()
    return this.httpClient.delete<ApiResponse>(`${environment.apiUrl}/api/contact/${id}`, {headers});
  }
  updateContact(id: string, contact: any): Observable<ApiResponse> {
    const headers = this.getAuthHeader()
    return this.httpClient.patch<ApiResponse>(`${environment.apiUrl}/api/contact/${id}`, contact,{headers});
  }

  addContact(contact: any): Observable<Contact> {

    const headers = this.getAuthHeader()

    return this.httpClient.post<Contact>(`${environment.apiUrl}/api/contact`, contact, { headers });
  }

  private getAuthHeader(){
    const token = localStorage.getItem('nestjs_todo_app');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }
}
