import { Component, OnInit } from '@angular/core';
import {User} from '../shared/book.model';
import {LibserviceService} from '../shared/libservice.service';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user:User;
  constructor(private libservice:LibserviceService, private loginPage:LoginComponent) { }

  ngOnInit(): void {
    this.libservice.getUserPorEmail(localStorage.getItem('token')).subscribe(c=>{
      this.user=c;
      sessionStorage.setItem('user', JSON.stringify(this.user));
      console.log(this.user);
    });
  }

}
