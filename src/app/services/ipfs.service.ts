import { Injectable, OnInit } from '@angular/core';
import * as ethers from 'ethers';
import { createHelia, DefaultLibp2pServices, HeliaLibp2p } from 'helia';
import { strings } from '@helia/strings';
import { CID } from 'multiformats/cid';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  constructor() {}
  helia:any;
  async storeData(data: string) {
    this.helia = await createHelia();
    const text = strings(this.helia);
    const hash = await text.add(data);
    return hash.toString();
  }

  async retrieveData(ipfsHash:string){
    const str = strings(this.helia)
    const cid = CID.parse(ipfsHash);
    const string = await str.get((cid as CID))
    
    return string;
  }
}
