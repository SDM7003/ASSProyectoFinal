import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LibserviceService} from '../shared/libservice.service';
import {User} from '../shared/book.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user:User;
  private token:string;
  cartCount: number = 0;
  protected subscriptions = [];

  constructor(protected libservice:LibserviceService,
              protected router: Router) {
    this.subscriptions.push(this.libservice.productAddedSubject$.subscribe(cart => {
      this.cartCount = this.libservice.getItemsCount();
    }));
  }

  ngOnInit(): void {
    this.libservice.getUserPorEmail(localStorage.getItem('token')).subscribe(c=>{
      this.user=c;
      sessionStorage.setItem('user', JSON.stringify(this.user));
    });
  }
  logout() {
    this.user=null;
    this.token=null;
    window.sessionStorage.clear();
    window.localStorage.clear();
    this.router.navigate(['']);
  }
}
