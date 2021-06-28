import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LibserviceService} from '../shared/libservice.service';
import {User} from '../shared/book.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token:String;
  user:User;
  constructor(private fb:FormBuilder, private libservice:LibserviceService, private router:Router) { }

  createUserForm=this.fb.group({
    usName:['',Validators.required],
    usSecName:['',Validators.required],
    usEmail:['',Validators.required],
    usPass:['',Validators.required],
    usCity:['',Validators.required],
    usPostCode:['',Validators.required],
    usDirection:['',Validators.required],
    usPhone:['',Validators.required],
  })

  loginForm=this.fb.group({
    userEmail:['',Validators.required],
    userPass:['',Validators.required],
  })

  get f () {return this.createUserForm.controls;}
  get l () {return this.loginForm.controls;}

  ngOnInit(): void {
    this.libservice.getUserPorEmail(localStorage.getItem('token')).subscribe(c=>{
      this.user=c;
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['account']);
    });
  }

  onLogin() {
    this.libservice.login(this.l.userEmail.value, this.l.userPass.value).subscribe(
      token=>{
        token=token.token;
        localStorage.setItem('token', token.toString());
        this.libservice.getUserPorEmail(token).subscribe
        (
          (userA:User) => {
            this.user = userA;
            localStorage.setItem('cliente', this.user.toString());
            console.log(this.user);
            console.log(token);
            window.location.reload();
          }
        );
      }
    );
  }


  onRegistration(){
    this.libservice.addUser(this.f.usName.value, this.f.usSecName.value, this.f.usEmail.value, this.f.usPass.value,
      this.f.usCity.value,this.f.usPostCode.value,this.f.usDirection.value, this.f.usPhone.value).subscribe();
    console.log(this.f.usName.value, this.f.usSecName.value, this.f.usEmail.value, this.f.usPass.value,
      this.f.usCity.value,this.f.usPostCode.value,this.f.usDirection.value, this.f.usPhone.value);
  }
}
