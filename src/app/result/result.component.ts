import { Component, OnInit } from '@angular/core';
import {LibserviceService} from '../shared/libservice.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  public lines = [];
  public totalCart = 0;

  constructor(libservice:LibserviceService) {
    this.lines = libservice.getCartLines();
    this.totalCart = libservice.getGrandTotal();
  }


  ngOnInit(): void {
  }

}
