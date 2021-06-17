import {Component, Inject, PLATFORM_ID} from '@angular/core';
declare var window: any;

import {CoreService} from './services/core.service';
import {Web3Service} from './blockchain/web3.service';
import {UpdateService} from './services/update.service';
import {environment} from '../environments/environment';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  walletAddress: string;

  lpBalanceBSCSub;
  lpBalance: number;

  balanceBSCSub;
  balance: number;

  web3Supported = true;

  constructor(private update: UpdateService,
              private coreService: CoreService,
              private web3Service: Web3Service,
              @Inject(PLATFORM_ID) private platformId: object) {

    this.web3Supported = window?.web3 !== undefined && window?.web3 !== null;

    if (isPlatformBrowser(this.platformId) && environment.production) {
      if ('serviceWorker' in navigator) {
        this.update.checkForUpdate();
      }
    }
    this.signInWallet();
  }

  signInWallet() {
    if (window.web3) {
      this.web3Service.getAccount().then((walletAddress: string | null) => {
        this.walletAddress = walletAddress;
        this.getBalance(walletAddress);
        this.getLpBalance();
      });
      window.ethereum.on('accountsChanged', (accounts) => {
        this.walletAddress = accounts[0];
        this.getBalance(accounts[0]);
        this.getLpBalance();
      });
      window.ethereum.on('disconnect', (accounts) => {
        this.logoutWallet();
      });
      window.onbeforeunload = () => {
        return 'Prevent reload';
      };
    } else {
      this.walletAddress = null;
    }
  }

  getLpBalance() {
    if (this.lpBalanceBSCSub) {
      this.lpBalanceBSCSub.unsubscribe();
    }
    this.lpBalanceBSCSub = this.coreService.getLpBalance().subscribe((data: any) => {
      console.log('data', data);

      if (!data) {
        this.lpBalance = 0;
      } else {
        this.lpBalance = data.result > 0 ? data.result.toString().slice(0, -9) : 0;
      }
    });
  }

  getBalance(walletAddress: string) {
    if (this.balanceBSCSub) { this.balanceBSCSub.unsubscribe(); }
    this.balanceBSCSub = this.coreService.getBalance(walletAddress).subscribe((data: any) => {
      if (!data) {
        this.balance = 0;
      } else {
        this.balance = data.result > 0 ? data.result.toString().slice(0, -9) : 0;
      }
    });
  }

  logoutWallet() {
    this.walletAddress = null;
    this.lpBalance = null;
    this.balance = null;
  }

  success: boolean = false;
  copy() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 3000)
  }
}
