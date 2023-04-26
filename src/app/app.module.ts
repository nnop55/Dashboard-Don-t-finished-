import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { CustomMaterialModule } from './shared/custom-material/custom-material.module';
import { RootComponent } from './components/app-root/root/root.component';
import { SharedModule } from './shared/shared-module/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule.forRoot(),
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
