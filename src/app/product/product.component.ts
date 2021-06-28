import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LibserviceService} from '../shared/libservice.service';
import {User} from '../shared/book.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public product;
  public relatedProducts = [];
  public subscriptions = [];
  constructor( protected route: ActivatedRoute,private router:Router,
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
  user:User;
  ngOnInit(): void {
    this.libservice.getUserPorEmail(localStorage.getItem('token')).subscribe(c=>{
      this.user=c;
      sessionStorage.setItem('user', JSON.stringify(this.user));
    });
  }
  public addToCartBtn(event){
    this.libservice.addItemToCart(this.product,1);
  }
  public goToLogin(){
    this.router.navigate(['/login'])
  }

}
