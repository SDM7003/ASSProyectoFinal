import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LibserviceService} from '../shared/libservice.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product;
  public relatedProducts = [];
  public subscriptions = [];
  constructor( protected route: ActivatedRoute,
               protected libservice:LibserviceService) {
    this.subscriptions.push(this.route.params.subscribe(params => {
      let id = params['id'];
      //this.product = this.productDaoService.getProduct(productId);
      this.libservice.getBook(id).subscribe(product=>{
        this.product=product;
      });
      if(!!this.product.relatedProducts) {
        //this.relatedProducts = this.productDaoService.getProducts(this.product.relatedProducts);
      }
      else {
        this.relatedProducts = [];
      }
    }));

    console.log("call to constructor");
  }

  ngOnInit(): void {
  }
  public addToCartBtn(event){
    this.libservice.addItemToCart(this.product,1);
  }

}
