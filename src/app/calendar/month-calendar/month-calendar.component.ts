import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

declare var $: any;

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
			onMonthChange: this.changeMonth
		}
	};
	@Input() events: Array<any>;
	@Input() currMonth: number;
	@Input() currYear: number;
	@Input() today: Date;
	@Output() monthChanged: EventEmitter<Object> = new EventEmitter<Object>();
	clndr;
	
	constructor() {}
	
	ngOnInit()
	{
		this.init();
	}
	
	init()
	{
		this.options['events'] = this.events;
		
		if (this.clndr)
		{
			this.clndr.destroy();
		}
		
		this.clndr = $('#cal-month').clndr(this.options);
		
		this.clndr.componentRef = this;
		
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
	}
	
	changeMonth(month)
	{
		((<any>this).componentRef).monthChanged.emit(month);
	}
}
