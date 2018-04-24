import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { MenuComponent } from './menu/menu.component';
import { YearCalendarComponent } from './calendar/year-calendar/year-calendar.component';
import { MonthCalendarComponent } from './calendar/month-calendar/month-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    YearCalendarComponent,
    MonthCalendarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
