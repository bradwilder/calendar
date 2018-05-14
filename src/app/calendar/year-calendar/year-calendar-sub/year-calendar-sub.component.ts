import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CalendarBaseModel } from '../../calendar-base.model';

@Component
({
	selector: 'app-year-calendar-sub',
	templateUrl: './year-calendar-sub.component.html',
	encapsulation: ViewEncapsulation.None
})
export class YearCalendarSubComponent
{
	@Input() months = [];
	@Input() year = "";
	@Input() daysOfTheWeek = [];
	@Input() calendarModel: CalendarBaseModel;
	selectedDay = "";
	
	onPreviousClicked()
	{
		this.calendarModel.previousInterval();
	}
	
	onNextClicked()
	{
		this.calendarModel.nextInterval();
	}
	
	onSelectDay(date)
	{
		if (date)
		{
			let month = date.month() + 1;
			let monthStr = month < 10 ? '0' + month : month;
			let day = date.date();
			let dayStr = day < 10 ? '0' + day : day;
			this.selectedDay = 'calendar-day-' + date.year() + '-' + monthStr + '-' + dayStr;
		}
	}
}
