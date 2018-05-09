import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarBaseModel } from '../calendar-base.model';
import { CalendarViewType } from '../calendar-view-type.enum';

@Component
({
	selector: 'app-year-calendar',
	templateUrl: './year-calendar.component.html',
	providers: [CalendarBaseModel]
})
export class YearCalendarComponent implements OnInit, OnDestroy
{
	constructor(private calendarModel: CalendarBaseModel) {}
	
	ngOnInit()
	{
		this.calendarModel.options = Object.assign(this.calendarModel.options,
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
			showAdjacentMonths: false,
			clickEvents:
			{
				onIntervalChange: this.calendarModel.changeInterval.bind(this.calendarModel)
			},
			lengthOfTime:
			{
				months: 12,
				days: null,
				interval: 12
			}
		});
		
		this.calendarModel.init(CalendarViewType.Year);
	}
	
	ngOnDestroy()
	{
		this.calendarModel.onDestroy();
	}
}
