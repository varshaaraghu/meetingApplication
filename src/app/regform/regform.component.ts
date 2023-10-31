import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-regform',
  templateUrl: './regform.component.html',
  styleUrls: ['./regform.component.css']
})
export class RegformComponent implements OnInit {
  regForm!: FormGroup;

  constructor(private fb: FormBuilder,private registerService: RegisterService) {
    this.regForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      address: new FormControl('', [Validators.required]),
      pwd: new FormControl(''),
      repeatPwd: new FormControl(''),
    }, { validator: this.checkPwd});
  }


  // checkPwdMatch: ValidatorFn = (
  //   control: AbstractControl
  // ): ValidationErrors | null => {
  //   return control.value.pwd === control.value.repeatPwd
  //     ? null
  //     : { passwordNoMatch: true };
  // };
  

  onRegister() {
    let registerUser = this.regForm.value;
    registerUser.id = (Math.random() * 10).toFixed();
    this.registerService.registerClient(registerUser).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error)
      },
      complete: () => {
       
        alert("Client registered");
      }
    })
  }

  ngOnInit(): void {
   
  }
  checkPwd(group: FormGroup) {
    if (group.controls['pwd'].value === '') {     
      group.controls['pwd'].setErrors({ 'required': true });
    }else{
      if ((group.controls['pwd'].value).length >8  || (group.controls['pwd'].value).length <5) {        
        group.controls['pwd'].setErrors({ 'length': true });
      }
    }
    if (group.controls['repeatPwd'].value === '') {     
      group.controls['repeatPwd'].setErrors({ 'required': true });
    }else{     
      if ((group.controls['repeatPwd'].value).length >8  || (group.controls['repeatPwd'].value).length <5) {        
        group.controls['repeatPwd'].setErrors({ 'length': true });
      }
    }
    if ((group.controls['repeatPwd'].value).length <=8  && (group.controls['repeatPwd'].value).length >=5) {
      if ((group.controls['pwd'].value).length <=8  && (group.controls['pwd'].value).length >=5) {
      if(group.controls['pwd'].value !== group.controls['repeatPwd'].value){
        console.log("repeat lepwd no match ");
        group.controls['repeatPwd'].setErrors({ 'passwordNoMatch': true });
      }
      }
    }
  }
}
