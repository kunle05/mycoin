import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MineCoinsComponent } from './mine-coins/mine-coins.component';
import { BuyCoinComponent } from './buy-coin/buy-coin.component';
import { SellCoinComponent } from './sell-coin/sell-coin.component';
import { LedgerComponent } from './ledger/ledger.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MineCoinsComponent,
    BuyCoinComponent,
    SellCoinComponent,
    LedgerComponent,
    TransactionComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
