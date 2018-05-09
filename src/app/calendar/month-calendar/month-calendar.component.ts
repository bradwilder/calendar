import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarBaseModel } from '../calendar-base.model';
import { CalendarViewType } from '../calendar-view-type.enum';

@Component
({
	selector: 'app-month-calendar',
	templateUrl: './month-calendar.component.html',
	providers: [CalendarBaseModel]
})
export class MonthCalendarComponent implements OnInit, OnDestroy
{
	constructor(private calendarModel: CalendarBaseModel) {}
	
	ngOnInit()
	{
		this.calendarModel.options = Object.assign(this.calendarModel.options,
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
			adjacentDaysChangeMonth: true,
			clickEvents:
			{
				onMonthChange: this.calendarModel.changeMonth.bind(this.calendarModel)
			}
		});
		
		this.calendarModel.init(CalendarViewType.Month);
	}
	
	ngOnDestroy()
	{
		this.calendarModel.onDestroy();
	}
}
