import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { CreateAccountComponent } from './views/create-account/create-account.component';
import { FileUploadComponent } from './views/file-upload/file-upload.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'upload',
    component:FileUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
