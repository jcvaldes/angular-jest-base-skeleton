import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { BookService } from './services/book.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, PagesModule, AppRoutingModule],
  providers: [BookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
