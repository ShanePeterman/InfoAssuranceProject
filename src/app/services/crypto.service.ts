import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  encryptionKey:string = 'oausdfh#S#fw%x@DG^sgd#sDvC32@3DSS#3f^'

  constructor() { }

  encryptData(data:string):string{
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  decryptData(data:string):string{
    const bytes = CryptoJS.AES.decrypt(data, this.encryptionKey);

    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
