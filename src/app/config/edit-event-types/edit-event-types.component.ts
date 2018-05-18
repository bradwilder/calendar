import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../calendar/calendar.service';

@Component
({
	selector: 'app-edit-event-types',
	templateUrl: './edit-event-types.component.html',
	styleUrls: ['./edit-event-types.component.scss']
})
export class EditEventTypesComponent
{
	eventTypes = [];
	
	constructor(private calendarService: CalendarService) {}
	
	ngOnInit()
	{
		this.calendarService.getEventTypes().subscribe((res) => 
		{
			this.eventTypes = res;
		});
	}
}
