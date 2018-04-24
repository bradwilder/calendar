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
			template: 
			`
				<div class="clndr-controls">
					<div class="clndr-control-button">
						<span class="clndr-previous-button"><i class="fa fa-chevron-left"></i> Previous</span>
					</div>
					<div class="clndr-control-title"><%= month %> <%= year %></div>
					<div class="clndr-control-button rightalign">
						<span class="clndr-next-button">Next <i class="fa fa-chevron-right"></i></span>
					</div>
				</div>
				<table class="clndr-table clndr-block" border="0" cellspacing="0" cellpadding="0">
					<thead>
						<tr class="header-days">
							<% _.each(daysOfTheWeek, function(day) { %>
								<th class="header-day"><%= day %></th>
							<% }); %>
						</tr>
					</thead>
					<tbody>
						<% _.each(days, function(day, i) { %>
							<% if (i % 7 == 0) { %>
								<tr class="table-days">
							<% } %>
							<td class="<%= day.classes %>">
								<div class="day-contents"><%= day.day %></div>
								<div class="day-icons">
									<% _.each(day.events, function(event) { %>
										<img class="day-icon" src="/assets/img/event-type-icons/<%= event.type %>.svg">
									<% }); %>
								</div>
								<i data-modal="#addEventModal" class="day-event-btn fa fa-plus"></i>
							</td>
							<% if (i % 7 == 6) { %>
								</tr>
							<% } %>
						<% }); %>
					</tbody>
				</table>
			`,
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
			template: 
			`
				<div class="cal-year__container">
					<div class="cal-year__controls clndr-controls">
						<div class="clndr-control-button">
							<span class="clndr-previous-button"><i class="fa fa-chevron-left"></i> Previous</span>
						</div>
						<div class="clndr-control-title"><%= intervalStart.format("YYYY") %></div>
						<div class="clndr-control-button rightalign">
							<span class="clndr-next-button">Next <i class="fa fa-chevron-right"></i></span>
						</div>
					</div>
					<div class="row cal-year__row">
						<% _.each(months, function(month) { %>
							<div class="clndr-block col-lg-4 col-sm-6">
								<div class="cal-year__title"><%= month.month.format("MMMM") %></div>
								<table class="cal-year__table clndr-table" border="0" cellspacing="0" cellpadding="0">
									<thead>
										<tr class="header-days">
											<% _.each(daysOfTheWeek, function(day) { %>
												<th class="header-day"><%= day %></th>
											<% }); %>
										</tr>
									</thead>
									<tbody>
										<% _.each(month.days, function(day, i) { %>
											<% if (i % 7 == 0) { %>
												<tr class="table-days table-days--short">
											<% } %>
											<td class="<%= day.classes %>">
												<div class="day-contents"><%= day.day %></div>
												<div class="day-icons day-icons--center">
													<% if (day.events.length > 0) { %>
														<img class="day-icon day-icon--small" src="/assets/img/event-type-icons/circle.svg">
													<% } %>
												</div>
												<% if (day.classes.indexOf('day') != -1) { %>
													<i data-modal="#addEventModal" class="day-event-btn fa fa-plus"></i>
												<% } %>
											</td>
											<% if (i % 7 == 6) { %>
												</tr>
											<% } %>
										<% }); %>
									</tbody>
								</table>
							</div>
						<% }); %>
					</div>
				</div>
			`,
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
			//console.log($('#cal-year'));
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
