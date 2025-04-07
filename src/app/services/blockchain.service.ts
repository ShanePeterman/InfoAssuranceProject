import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import ABI from './abi.json';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  web3!: Web3;
  contract: any;

  hashes: string[] = [];

  constructor() {}

  async oninit() {
    try {
      this.web3 = new Web3(
        new Web3.providers.HttpProvider(
          'https://sepolia.infura.io/v3/577111ce0cc84ccca6a6e9de0ae6d0f5'
        )
      );

      this.contract = new this.web3.eth.Contract(
        ABI as AbiItem[],
        '0xb73444e474999Ad56cc5984a0FE90F7176e7ec67'
      );
    } catch (err: any) {
      console.log(err);
    }
  }

  async getHashes() {
    const hashes = this.contract.methods.getIPFSHash().call();
    const resolvedHashes = await Promise.all([hashes]);
    return resolvedHashes;
  }

  //Code in this function is partially my own and partially code that was written by someone else online.
  //I tried for so long to get it working on my own but ran out of time and found an example that worked well since
  //the node won't allow you to send an unsigned transaction and I did not have enough time to figure things out on my own
  // I plan on fixing this to either include a private key or do something different between now and deployment of the paper
  // This is simply just a demonstration for proof of concept and is not a finished product, and I am not attempting to turn this in
  // for credit. Credit for this code goes to joshua morony on youtube, although I did research to make sure I understood it before I
  //Used it
  async addHash(hash: string): Promise<string> {
    //detect the ethereum network provider - Shane Peterman
    const provider: any = await detectEthereumProvider();

    //gets the accounts from the network provider (metamask in my case, ethereum sepolia) - Shane Peterman
    await provider.request({ method: 'eth_requestAccounts' });

    //parameters for the transaction, the first being the address in the contract option,
    //the next being the address of my metamask browser extension wallet
    //and the third being the method to be executed along with the Application Binary Interface - Shane Peterman
    const transactionParameters = {
      to: this.contract.options.address,
      from: provider.selectedAddress,
      data: this.contract.methods.setIPFSHash(hash).encodeABI(),
    };

    //Sends a request to the network provider (sepolia) to run my transaction on the blockchain because normal
    //unsigned transactions are unable to be used with infura out of the box - Shane Peterman
    return provider.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
  }
}
