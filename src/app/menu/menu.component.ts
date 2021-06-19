import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LibserviceService} from '../shared/libservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cartCount: number = 0;
  protected subscriptions = [];

  constructor(protected libservice:LibserviceService,
              protected router: Router) {
    this.subscriptions.push(this.libservice.productAddedSubject$.subscribe(cart => {
      this.cartCount = this.libservice.getItemsCount();
    }));
  }

  ngOnInit(): void {
  }

}
