import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  allTransactions = [];
  transId = 1;
  totalCoin = 0;
  coinValue = 0;

  constructor(private _http: HttpClient) { }

  getTrivia(){
    return this._http.get('https://opentdb.com/api.php?amount=20&category=9&difficulty=hard&type=multiple');
  }
  getTriviaforBuying(){
    return this._http.get('https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple');
  }
  sellTrivia(){
    return this._http.get('https://opentdb.com/api.php?amount=20&category=21&difficulty=easy&type=multiple');
  }

  updateInfo(trans){
    this.allTransactions.push(trans);
    this.transId ++;
    this.totalCoin = trans.coinOwned;
    this.coinValue = trans.value;
    return this.transId;
  }

  getCurrentStatus(){
    return {value: this.coinValue, total: this.totalCoin, id: this.transId}
  }

  getCurrentStaus(){
    return {value: this.coinValue, total: this.totalCoin, id: this.transId}
  }

  getAllTrans(){
    return this.allTransactions;
  }

  getOne(num){
    return this.allTransactions[num-1]
  }
}
