import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { TriviaQuestionComponent } from './trivia-question/trivia-question.component';

import { TriviaServiceService } from './trivia-service.service';

@NgModule({
  declarations: [
    AppComponent,
    TriviaQuestionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [TriviaServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
