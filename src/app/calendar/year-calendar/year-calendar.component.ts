import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component
({
	selector: 'app-year-calendar',
	templateUrl: './year-calendar.component.html'
})
export class YearCalendarComponent implements OnInit, OnDestroy
{
	options: Object =
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
		showAdjacentMonths: false,
		trackSelectedDate: true,
		clickEvents:
		{
			onIntervalChange: this.changeInterval.bind(this)
		},
		lengthOfTime:
		{
			months: 12,
			days: null,
			interval: 12
		},
		events: []
	};
	eventsSubscription: Subscription;
	today: Date;
	todaySubscription: Subscription;
	currYear: number;
	clndr;
	
	constructor(private calendarService: CalendarService) {}
	
	ngOnInit()
	{
		this.eventsSubscription = this.calendarService.eventsChanged.subscribe((events: Array<any>) =>
		{
			this.options['events'] = events;
			
			if (this.clndr)
			{
				this.clndr.setEvents(this.options['events']);
			}
		});
		
		this.todaySubscription = this.calendarService.todayChanged.subscribe((today: Date) =>
		{
			this.today = today;
			
			this.init();
		});
		
		this.options['events'] = this.calendarService.getEvents();
		this.currYear = this.calendarService.currYear;
		this.today = this.calendarService.today;
		
		this.init();
	}
	
	init()
	{
		this.options['startWithMonth'] = this.today.getFullYear() + "-01-01";
		
		if (this.clndr)
		{
			this.clndr.destroy();
		}
		
		this.clndr = $('.cal-year').clndr(this.options);
		
		if (this.currYear && this.currYear != this.today.getFullYear())
		{
			this.clndr.setYear(this.currYear);
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
	
	changeInterval(start, end)
	{
		this.calendarService.currYear = start.year();
	}
}
