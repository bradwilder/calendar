import { Component, Input } from '@angular/core';
import { CalendarBaseModel } from '../../calendar-base.model';
import { CalendarViewType } from '../../calendar-view-type.enum';

@Component
({
	selector: 'app-year-calendar-sub',
	templateUrl: './year-calendar-sub.component.html',
	styleUrls: ['./year-calendar-sub.component.scss']
})
export class YearCalendarSubComponent
{
	@Input() months = [];
	@Input() year = "";
	@Input() daysOfTheWeek = [];
	@Input() calendarModel: CalendarBaseModel;
}
