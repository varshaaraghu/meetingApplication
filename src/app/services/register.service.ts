import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http:HttpClient) { }

  registerClient(user:any):Observable<any>{
    return this.http.post("http://localhost:3000/registeredUsers",user);
  }
}
