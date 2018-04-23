import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import * as $ from 'jquery';

@Component
({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent
{
	events: Array<any>;
	currMonth: Number;
	currYear: Number;
	today: Date;
	showing: String;
	monthOptions: Object;
	yearOptions: Object;
	clndr;
	
	constructor(private _dataService: DataService)
	{
		this.today = new Date();
		
		this.showing = 'month';
		
		this._dataService.getEvents()
			.subscribe(res => this.events = res);
		
		this.monthOptions =
		{
			template: $('#cal-month-template').html(),
			daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			events: this.events,
			adjacentDaysChangeMonth: true,
			trackSelectedDate: true,
			clickEvents:
			{
				onMonthChange: this.changeMonth,
				onYearChange: this.changeYear
			}
		};
		
		this.yearOptions =
		{
			template: $('#cal-year-template').html(),
			daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
			events: this.events,
			showAdjacentMonths: false,
			trackSelectedDate: true,
			clickEvents:
			{
				onIntervalChange: this.changeInterval
			},
			lengthOfTime:
			{
				months: 12,
				days: null,
				interval: 12
			},
			startWithMonth: (this.today.getFullYear() + "-01-01")
		};
		
		this.createClndr();
	}
	
	createClndr()
	{
		if (this.clndr)
		{
			this.clndr.destroy();
		}
		
		if (this.showing === 'month')
		{
			this.clndr = $('#cal').clndr(this.monthOptions);
			
			
		}
		else if (this.showing === 'year')
		{
			this.clndr = $('#cal').clndr(this.yearOptions);
			
			
		}
	}
	
	changeMonth(month)
	{
		this.currMonth = month.month();
	}
	
	changeYear(year)
	{
		this.currYear = year;
	}
	
	changeInterval(start, end)
	{
		this.currYear = start.year();
	}
}
