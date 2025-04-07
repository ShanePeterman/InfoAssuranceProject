import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { CreateAccountComponent } from './views/create-account/create-account.component';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from './views/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CreateAccountComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
