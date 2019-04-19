import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-mine-coins',
  templateUrl: './mine-coins.component.html',
  styleUrls: ['./mine-coins.component.css']
})
export class MineCoinsComponent implements OnInit {
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
    this.num = Math.floor(Math.random()*20)

    this.numforAns = Math.floor(Math.random()*3)
    console.log(this.num);
    console.log(this.numforAns);

    let tempObservable = this._httpService.getTrivia();
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
    this.getSatus();

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
    this.aTrans = {action: "Mined", amount: x, value: this.coinValue, id: this.transId, coinOwned: this.coinOwned }

    let updateTrans = this._httpService.updateInfo(this.aTrans);
    console.log("updatetrans returns", updateTrans)
    this.transId = updateTrans;
 
    // this.allTransactions.push(this.aTrans);
    // console.log(this.allTransactions)
  }
  
  flashmessage(x){
    if(x == 1){
      this.displayMsg = "You succesfully mined 1 coin";
      this.color = "success";
    }
    if(x == 0){
      this.displayMsg = "Mining fail. Try Again!!"
      this.color = "danger";
    }
  }
}
