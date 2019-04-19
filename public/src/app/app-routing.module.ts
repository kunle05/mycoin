import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MineCoinsComponent } from './mine-coins/mine-coins.component';
import { BuyCoinComponent } from './buy-coin/buy-coin.component';
import { SellCoinComponent } from './sell-coin/sell-coin.component';
import { LedgerComponent } from './ledger/ledger.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'mine', component: MineCoinsComponent },
  { path: 'buy-coin', component: BuyCoinComponent },
  { path: 'sell-coin', component: SellCoinComponent },
  { path: 'ledger', component: LedgerComponent },
  { path: 'ledger/transaction/:id', component: TransactionComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
