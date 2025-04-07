import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  password:string = '';
  username:string = '';
  acctSvc:AccountService = inject(AccountService);
  router:Router = inject(Router)

  async onLogin(){
    const result = await this.acctSvc.login(this.username, this.password);
    if(result){
      this.router.navigate(['/upload'])
    } else {
      window.alert('Invalid username or password!')
    }
  }

  

}
