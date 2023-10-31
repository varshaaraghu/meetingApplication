import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient) { }
   
  checkLoginDetails(login:any):boolean {
 
    if(login.emailid=="admin@gmail.com" && login.password=="admin@123"){
      return true;
    }else {
      return false;
    }

  }
}
