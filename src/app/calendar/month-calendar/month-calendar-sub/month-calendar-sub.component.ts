import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CalendarBaseModel } from '../../calendar-base.model';
import { CalendarViewType } from '../../calendar-view-type.enum';

@Component
({
	selector: 'app-month-calendar-sub',
	templateUrl: './month-calendar-sub.component.html',
	encapsulation: ViewEncapsulation.None
})
export class MonthCalendarSubComponent
{
	@Input() weeks = [];
	@Input() month = "";
	@Input() year = "";
	@Input() daysOfTheWeek = [];
	@Input() calendarModel: CalendarBaseModel;
}
