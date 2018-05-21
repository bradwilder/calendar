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
import { EditEventTypesComponent } from './config/edit-event-types/edit-event-types.component';
import { ConfigComponent } from './config/config.component';
import { EditEventTypeModalComponent, EditEventTypeComponent } from './modals/edit-event-type/edit-event-type.component';
import { AddEventTypeModalComponent, AddEventTypeComponent } from './modals/add-event-type/add-event-type.component';
import { CalendarControlsComponent } from './calendar/calendar-controls/calendar-controls.component';
import { CalendarTableComponent } from './calendar/calendar-table/calendar-table.component';
import { FiltersComponent } from './filters/filters.component';
import { FiltersService } from './filters/filters.service';
import { TodayService } from './calendar/today.service';
import { TypeFilterComponent } from './filters/type-filter/type-filter.component';
import { NameFilterComponent } from './filters/name-filter/name-filter.component';
import { DescriptionFilterComponent } from './filters/description-filter/description-filter.component';
import { ToggleSwitchComponent } from './inputs/toggle-switch/toggle-switch.component';
import { TextboxComponent } from './inputs/textbox/textbox.component';

@NgModule
({
	declarations:
	[
		AppComponent,
		MenuComponent,
		YearCalendarComponent,
		MonthCalendarComponent,
		AddEventModalComponent,
		AddEventComponent,
		YearCalendarSubComponent,
		MonthCalendarSubComponent,
		EditEventModalComponent,
		EditEventComponent,
		EditEventTypesComponent,
		ConfigComponent,
		EditEventTypeModalComponent,
		EditEventTypeComponent,
		AddEventTypeModalComponent,
		AddEventTypeComponent,
		CalendarControlsComponent,
		CalendarTableComponent,
		FiltersComponent,
		TypeFilterComponent,
		NameFilterComponent,
		DescriptionFilterComponent,
		ToggleSwitchComponent,
		TextboxComponent
	],
	imports:
	[
		BrowserModule,
		HttpModule,
		AppRoutingModule,
		FormsModule,
		NgbModule.forRoot()
	],
	providers:
	[
		DataService,
		CalendarService,
		TodayService,
		FiltersService
	],
	bootstrap: [AppComponent],
	entryComponents:
	[
		YearCalendarSubComponent,
		MonthCalendarSubComponent,
		AddEventComponent,
		EditEventComponent,
		EditEventTypeComponent,
		AddEventTypeComponent
	]
})
export class AppModule {}