import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  allTransactions : any;
  coinOwned: number;


  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllInfo();
    this.getSatus();
  }

  getSatus(){
    let data = this._httpService.getCurrentStaus();
    this.coinOwned = data.total;
  }

  getAllInfo(){
    let allInfo = this._httpService.getAllTrans();
    this.allTransactions = allInfo
  }

}
