import { Component } from '@angular/core';

import { DataService } from './data.service';

declare var $: any;

@Component
({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent
{
	today: Date;
	showing: string;
	events: Array<any>;
	currMonth: number;
	currYear: number;
	clndrMonth;
	clndrYear;
	monthOptions: Object;
	yearOptions: Object;
	
	constructor(private _dataService: DataService)
	{
		this.today = new Date();
		this.showing = 'Month';
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
		if (this.clndrMonth)
		{
			this.clndrMonth.destroy();
		}
		
		if (this.clndrYear)
		{
			this.clndrYear.destroy();
		}
		
		if (this.showing === 'Month')
		{
			//this.clndr = $('#cal').clndr(this.monthOptions);
			//this.clndrMonth = $('#cal-month').clndr(this.monthOptions);
			//this.clndrYear = $('#cal-year').clndr(this.yearOptions);
			console.log($('#cal-year'));
		}
		else if (this.showing === 'Year')
		{
			//this.clndr = $('#cal').clndr(this.yearOptions);
			
			
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
