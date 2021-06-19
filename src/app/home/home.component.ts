import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LibserviceService} from '../shared/libservice.service';
import {Product} from '../shared/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products = [];
  product:Product;

  constructor(private router:Router, private libservice:LibserviceService) {
    libservice.getBooks().subscribe(products=>{
      this.products=products;
    });
  }

  ngOnInit(): void {
  }



  viewProductPage(id):void{
    this.router.navigate(['/product', id]);
  }

}
