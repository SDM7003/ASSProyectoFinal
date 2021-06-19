import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LibserviceService} from '../shared/libservice.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public lines = [];
  public totalCart = 0;

  constructor(private router:Router, libservice:LibserviceService) {
    this.lines = libservice.getCartLines();
    this.totalCart = libservice.getGrandTotal();
  }

  ngOnInit(): void {
  }

  viewProductPage(id):void{
    this.router.navigate(['/product', id]);
  }

}
