import { Component, OnInit } from '@angular/core';
import {LibserviceService} from '../shared/libservice.service';
import {User} from '../shared/book.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public lines = [];
  public totalCart = 0;
  user:User;
  payForm:FormGroup;


  constructor(private libservice:LibserviceService, private fb:FormBuilder, private router:Router) {
    this.lines = libservice.getCartLines();
    this.totalCart = libservice.getGrandTotal();
  }

  ngOnInit(): void {
    this.libservice.getUserPorEmail(localStorage.getItem('token')).subscribe(c=>{
      this.user=c;
      sessionStorage.setItem('user', JSON.stringify(this.user));
      console.log(this.user);
    });
    this.payForm=this.fb.group({
      userName: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      userSecondName: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      userEmail: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      userLocation: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      userCode: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      userDirection: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      userPhone: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      cardNumberType: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      monthType: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      yearType: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      CCVType: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      cardHolderType: new FormControl(null,Validators.compose([
        Validators.required
      ])),
    });
    this.libservice.getUserPorEmail(localStorage.getItem('token')).subscribe(c=>{
      this.user=c;
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.payForm.controls.userName.setValue(this.user.name);
      this.payForm.controls.userSecondName.setValue(this.user.secondname);
      this.payForm.controls.userEmail.setValue(this.user.email);
      this.payForm.controls.userLocation.setValue(this.user.direction);
      this.payForm.controls.userCode.setValue(this.user.postcode);
      this.payForm.controls.userDirection.setValue(this.user.direction);
      this.payForm.controls.userPhone.setValue(this.user.tel);
    });
  }
  get f() { return this.payForm.controls;}

  payProduct(){
    this.libservice.result.name_res=this.payForm.value.userName;
    this.libservice.result.secondname_res=this.payForm.value.userSecondName;
    this.libservice.result.email_res=this.payForm.value.userEmail;
    this.libservice.result.local_res=this.payForm.value.userLocation;
    this.libservice.result.postcode_res=this.payForm.value.userCode;
    this.libservice.result.direction_res=this.payForm.value.userDirection;
    this.libservice.result.tel_res=this.payForm.value.userPhone;
    this.libservice.result.resultPrice=this.totalCart.toString();
    this.payForm.reset();
    this.router.navigate(['/cuenta']);
  }
  cancelPay(){
    this.payForm.reset();
    this.router.navigate(['']);
  }
}
