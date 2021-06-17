import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  apiKey = '1Q794ZET72A8TXY8BMHMPCSPFGTFQJ6G3X';
  tokenAddress = '0x7d2b2b15f1023425647626c4e411bea51f1ac0cd';

  constructor(private httpClient: HttpClient) {
  }

  getLpBalance() {
    const pooCoin = `https://api.pancakeswap.info/api/v2/tokens/${this.tokenAddress}`;
    return this.httpClient.get(pooCoin);
  }
  getBalance(walletAddress) {
    if (!walletAddress) {
      return of(null);
    }
    const bscScan = `https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=${this.tokenAddress}&address=${walletAddress}&tag=latest&apikey=${this.apiKey}`;
    return this.httpClient.get(bscScan);
  }

}
