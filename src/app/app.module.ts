import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgForm, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { MenuComponent } from './menu/menu.component';
import { YearCalendarComponent } from './calendar/year-calendar/year-calendar.component';
import { MonthCalendarComponent } from './calendar/month-calendar/month-calendar.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendarService } from './calendar/calendar.service';
import { AddEventModalComponent, AddEventComponent } from './modals/add-event/add-event.component';
import { YearCalendarSubComponent } from './calendar/year-calendar/year-calendar-sub/year-calendar-sub.component';
import { MonthCalendarSubComponent } from './calendar/month-calendar/month-calendar-sub/month-calendar-sub.component';
import { EditEventModalComponent, EditEventComponent } from './modals/edit-event/edit-event.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    YearCalendarComponent,
    MonthCalendarComponent,
	AddEventModalComponent,
	AddEventComponent,
    YearCalendarSubComponent,
    MonthCalendarSubComponent,
	EditEventModalComponent,
	EditEventComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
	AppRoutingModule,
	FormsModule,
	NgbModule.forRoot()
  ],
  providers: [DataService, CalendarService],
  bootstrap: [AppComponent],
  entryComponents: [YearCalendarSubComponent, MonthCalendarSubComponent, AddEventComponent, EditEventComponent]
})
export class AppModule { }
