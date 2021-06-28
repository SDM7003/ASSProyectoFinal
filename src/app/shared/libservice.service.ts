import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product, User} from './book.model';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

const httpOptionsLogin = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class LibserviceService {
  private readonly HS_API_URL='http://127.0.0.1:3000';
  private token : string;
  private headers = new HttpHeaders;
  private user:User;
  constructor(private http:HttpClient) { }

  public getBooks():any{
    return this.http.get<Product[]>(`${this.HS_API_URL}/products`);
  }
  public getBook(id:number):any{
    return this.http.get<Product>(`${this.HS_API_URL}/products/${id}`);
  }

  public getLoggedUser():string{
    return localStorage.getItem('user');
  }

  public login(userEmail:string, userPass:string):Observable<any>{
    let userAuth:User={email:userEmail, password:userPass}
    return this.http.post<any>(`${this.HS_API_URL}/login`, userAuth,httpOptionsLogin).pipe(
      catchError((err) => {
          console.log("Error en el login");
          console.error(err);
          return throwError(err);
        }
      )
    );
  }
  public getUserPorEmail(token:string): Observable<User>{
    var reqHeader = new HttpHeaders ({ Authorization: `Bearer ${token}`});
    return this.http.get<User>(`${this.HS_API_URL}/getuser`, {headers:reqHeader});
  }
  public addUser(usName:string,usSecName:string,usEmail:string,usPass:string
                 ,usCity:string,usPostCode:number,usDirection:string,usPhone:string):Observable<any>{
    let user:User={name:usName, secondname:usSecName, email:usEmail, password:usPass, city:usCity, postcode:usPostCode,direction:usDirection, tel:usPhone};
    return this.http.post<any>(`${this.HS_API_URL}/register`, user);
  }

  result = {
    name_res:'',
    secondname_res: '',
    email_res: '',
    local_res: '',
    postcode_res: '',
    direction_res: '',
    tel_res:'',
    resultPrice:''
  }

  protected cart = [];

  public productAddedSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(this.cart);

  public getCartLines() {
    return this.cart;
  }

  public getGrandTotal() {
    let returnValue = 0;
    this.cart.forEach(itemInCart => {
      returnValue = returnValue + (itemInCart.quantity * itemInCart.product.price);
    });
    return returnValue;
  }

  public addItemToCart(product: Product, quantity: number) {
    let added = false;
    this.cart.forEach(itemInCart => {
      if(itemInCart.product.title == product.title) {
        itemInCart.quantity = itemInCart.quantity + quantity;
        added = true;
      }
    });

    if(!added) {
      this.cart.push({
        product: product,
        quantity: quantity
      })
    }

    console.log(this.cart);

    this.productAddedSubject$.next(this.cart);

  }

  public getItemsCount() {
    let returnValue = 0;
    this.cart.forEach(item => {
      returnValue = returnValue + item.quantity;
    });
    return returnValue;
  }
}
