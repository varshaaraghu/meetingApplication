import { Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent {
  loginRef !: FormGroup;

  constructor(private fb: FormBuilder,private loginService: LoginService,public router:Router) {
    this.loginRef = new FormGroup({
    emailid:new FormControl(),
    password:new FormControl()
  });}
    
  msg:string ="";

  signIn(): void {

    let login = this.loginRef.value;
    let result = this.loginService.checkLoginDetails(login);
  if(result){
      alert("successfully login");
      this.router.navigate(["schedule-meeting"]);
  } else {
      this.msg="Invalid emailid or password";
  } 
  this.loginRef.reset();
  
  }
  
}
