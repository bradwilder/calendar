import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component
({
	selector: 'app-month-calendar',
	templateUrl: './month-calendar.component.html'
})
export class MonthCalendarComponent implements OnInit, OnDestroy
{
	options: Object =
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
		adjacentDaysChangeMonth: true,
		trackSelectedDate: true,
		clickEvents:
		{
			onMonthChange: this.changeMonth.bind(this)
		},
		events: []
	};
	eventsSubscription: Subscription;
	todaySubscription: Subscription;
	clndr;
	
	constructor(private calendarService: CalendarService) {}
	
	ngOnInit()
	{
		this.options['events'] = this.calendarService.getEvents();
		
		this.eventsSubscription = this.calendarService.eventsChanged.subscribe((events: Array<any>) =>
		{
			this.options['events'] = events;
			
			if (this.clndr)
			{
				this.clndr.setEvents(this.options['events']);
			}
		});
		
		this.todaySubscription = this.calendarService.todayChanged.subscribe(this.init);
		
		this.init();
	}
	
	init()
	{
		if (this.clndr)
		{
			this.clndr.destroy();
		}
		
		this.clndr = $('.cal-month').clndr(this.options);
		
		if (this.calendarService.hasDifferingCurrentMonth())
		{
			this.clndr.setYear(this.calendarService.currYear);
			this.clndr.setMonth(this.calendarService.currMonth);
		}
	}
	
	ngOnDestroy()
	{
		if (this.clndr)
		{
			this.clndr.destroy();
		}
		
		this.eventsSubscription.unsubscribe();
		this.todaySubscription.unsubscribe();
	}
	
	changeMonth(month)
	{
		this.calendarService.currMonth = month.month();
		this.calendarService.currYear = month.year();
	}
}
