import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs/Subscription';

@Component
({
	selector: 'app-month-calendar',
	templateUrl: './month-calendar.component.html'
})
export class MonthCalendarComponent implements OnInit, OnChanges, OnDestroy
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
		}
	};
	events: Array<any>;
	eventsSubscription: Subscription;
	currMonth: number;
	currYear: number;
	today: Date;
	clndr;
	
	constructor(private calendarService: CalendarService) {}
	
	ngOnInit()
	{
		this.eventsSubscription = this.calendarService.eventsChanged.subscribe((events: Array<any>) =>
		{
			this.events = events;
		});
		
		this.events = this.calendarService.getEvents();
		this.currMonth = this.calendarService.currMonth;
		this.currYear = this.calendarService.currYear;
		this.today = this.calendarService.today;
		
		this.init();
	}
	
	init()
	{
		this.options['events'] = this.events;
		
		if (this.clndr)
		{
			this.clndr.destroy();
		}
		
		this.clndr = $('.cal-month').clndr(this.options);
		
		if ((this.currYear && this.currMonth) && (this.currYear != this.today.getFullYear() || this.currMonth != this.today.getMonth()))
		{
			this.clndr.setYear(this.currYear);
			this.clndr.setMonth(this.currMonth);
		}
	}
	
	ngOnChanges(changes: SimpleChanges)
	{
		if (changes.today && !changes.today.firstChange)
		{
			this.init();
		}
	}
	
	ngOnDestroy()
	{
		if (this.clndr)
		{
			this.clndr.destroy();
		}
		
		this.eventsSubscription.unsubscribe();
	}
	
	changeMonth(month)
	{
		this.calendarService.currMonth = month.month();
		this.calendarService.currYear = month.year();
	}
}
