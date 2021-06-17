import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

declare var window: any;
const contractAbi = require('./contractABI.json');
@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3: Web3;
  private contract: Contract;
  private contractAddress = '0x7d2b2b15f1023425647626c4e411bea51f1ac0cd';

  constructor() {
    if (window.web3) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        contractAbi,
        this.contractAddress
      );
      window.ethereum.enable().catch((err) => {
        console.log('ethereum', err);
      });
    } else {
      console.warn('Metamask not found. Install or enable Metamask');
    }
  }
  getAccount(): Promise<string> {
    return this.web3.eth.getAccounts().then((accounts) => accounts[0] || null);
  }
  getNet(): Promise<string> {
    return this.web3.eth.net.getId().then((network) => network[0] || null);
  }
  async call(fnName: string, ...args: any[]) {
    const acc = await this.getAccount();
    return this.contract.methods[fnName](...args).call({ from: acc });
  }
}
