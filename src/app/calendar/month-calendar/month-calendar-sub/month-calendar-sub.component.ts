import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CalendarBaseModel } from '../../calendar-base.model';

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
	selectedDay = "";
	
	onPreviousClicked()
	{
		this.calendarModel.previousInterval();
	}
	
	onNextClicked()
	{
		this.calendarModel.nextInterval();
	}
	
	onDayClicked(day)
	{
		if (!day.properties.isAdjacentMonth)
		{
			const date = day. date;
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
				this.onPreviousClicked();
			}
			else if (day.classes.indexOf('next-month') != -1)
			{
				this.onNextClicked();
			}
		}
	}
}
