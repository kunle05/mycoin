import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-buy-coin',
  templateUrl: './buy-coin.component.html',
  styleUrls: ['./buy-coin.component.css']
})
export class BuyCoinComponent implements OnInit {
  transId : number;
  coinValue: number;
  coinOwned: number;

  possibleAnswers = [];
  numforAns : number;
  question: any;
  num: number;
  chosenAnswer : string;
  displayMsg : string;
  color : string;
  aTrans = {};

  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    this.getQuestion();
    this.getSatus();
  }
  
  getSatus(){
    let data = this._httpService.getCurrentStaus();
    this.transId = data.id;
    this.coinValue = data.value;
    this.coinOwned = data.total;
  }

  getQuestion(){
    this.num = Math.floor(Math.random()*10)
    console.log(this.num);
    this.numforAns = Math.floor(Math.random()*3)

    let tempObservable = this._httpService.getTriviaforBuying();
    tempObservable.subscribe(data => {
      console.log(data);
      this.question = data;

      for(let x =0; x < data["results"][this.num].incorrect_answers.length; x++){
        if(x == this.numforAns){
          this.possibleAnswers.push(data["results"][this.num].correct_answer);
          this.possibleAnswers.push(data["results"][this.num].incorrect_answers[this.numforAns]);      
        }
        else{
          this.possibleAnswers.push(data["results"][this.num].incorrect_answers[x]);
        }
      }
    })
  }

  submitForm(){

    let correctAnswer = this.question.results[this.num].correct_answer;
    let x = 0;
    if(this.chosenAnswer == correctAnswer){
      this.coinValue +=1;
      this.coinOwned +=1;

      x = 1;
      console.log(this.coinValue)
      this.flashmessage(x)
      this.getQuestion();
    }
    else{
      this.flashmessage(x)
      this.getQuestion();
    }  
    this.chosenAnswer ="";
    this.possibleAnswers = [];
    this.aTrans = {action: "Bought", amount: x, value: this.coinValue, coinOwned: this.coinOwned, id: this.transId }
    this.transId++

    let updateTrans = this._httpService.updateInfo(this.aTrans);
    console.log("updatetrans returns", updateTrans)
    // this.transId = updateTrans;
  }

  flashmessage(x){
    if(x == 1){
      this.displayMsg = "Purchase Successful";
      this.color = "success";
    }
    if(x == 0){
      this.displayMsg = "Purchase failed!!"
      this.color = "danger";
    }
  }

}
