import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts:Array<any> = []
  constructor() { }

  createAccount(username:string, password:string){
    const saltRounds = 10;
    let newUser:any;
    let passwordHash = bcrypt.hashSync(password, saltRounds)
    newUser = {
      username:username,
      password: passwordHash
    }
    this.accounts.push(newUser);
  }

  async login(username:string, password:string):Promise<boolean>{
    const user = await this.accounts.find((acct:any) => acct.username === username);
    const result = await bcrypt.compareSync(password,
      this.accounts.find((acct) => acct.username === username).password
    )
    return result;
  }

  // const bcrypt = require('bcrypt');
  //   const saltRounds = 10; // Adjust as needed for security/performance

  //   // Hashing a password
  //   bcrypt.hash("myPassword", saltRounds, function(err, hash) {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log("Hashed Password:", hash);
  //     }
  //   });

  //   // Comparing a password with a hash
  //   bcrypt.compare("myPassword", "$2b$10$3b43a56789012345678901234567890123456789", function(err, result) {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log("Password match:", result); // Output: true
  //     }
  //   });
}
