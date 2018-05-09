import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgForm, FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { MenuComponent } from './menu/menu.component';
import { YearCalendarComponent } from './calendar/year-calendar/year-calendar.component';
import { MonthCalendarComponent } from './calendar/month-calendar/month-calendar.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendarService } from './calendar/calendar.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    YearCalendarComponent,
    MonthCalendarComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
	AppRoutingModule,
	FormsModule
  ],
  providers: [DataService, CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
