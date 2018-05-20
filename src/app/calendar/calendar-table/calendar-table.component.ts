import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CalendarViewType } from '../calendar-view-type.enum';
import { CalendarBaseModel } from '../calendar-base.model';

@Component
({
	selector: 'app-calendar-table',
	templateUrl: './calendar-table.component.html',
	styleUrls: ['./calendar-table.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class CalendarTableComponent
{
	@Input() daysOfTheWeek;
	@Input() weeks;
	@Input() calendarModel: CalendarBaseModel;
	selectedDay = "";
	
	isYearView()
	{
		return this.calendarModel.mode === CalendarViewType.Year;
	}
	
	onDayClicked(day)
	{
		if (!day.properties.isAdjacentMonth)
		{
			const date = day.date;
			if (date)
			{
				let month = date.month() + 1;
				let monthStr = month < 10 ? '0' + month : month;
				let day = date.date();
				let dayStr = day < 10 ? '0' + day : day;
				this.selectedDay = 'calendar-day-' + date.year() + '-' + monthStr + '-' + dayStr;
			}
		}
		else
		{
			if (day.classes.indexOf('last-month') != -1)
			{
				this.calendarModel.previousInterval();
			}
			else if (day.classes.indexOf('next-month') != -1)
			{
				this.calendarModel.nextInterval();
			}
		}
	}
}
