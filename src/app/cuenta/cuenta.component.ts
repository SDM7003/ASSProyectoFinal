import { Component, OnInit } from '@angular/core';
import {LibserviceService} from '../shared/libservice.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  constructor(private shared:LibserviceService) { }

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

  ngOnInit(): void {
    this.result.name_res=this.shared.result.name_res;
    this.result.secondname_res=this.shared.result.secondname_res;
    this.result.email_res=this.shared.result.email_res;
    this.result.local_res=this.shared.result.local_res;
    this.result.postcode_res=this.shared.result.postcode_res;
    this.result.direction_res=this.shared.result.direction_res;
    this.result.tel_res=this.shared.result.tel_res;
    this.result.resultPrice=this.shared.result.resultPrice;
  }

}
