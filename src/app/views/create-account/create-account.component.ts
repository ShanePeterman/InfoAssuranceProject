import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  password:string = '';
  username:string = '';
  acctSvc:AccountService = inject(AccountService);
  router:Router = inject(Router)

  onCreateAccount(){
    this.acctSvc.createAccount(this.username, this.password);
    this.router.navigate([''])
  }
}
