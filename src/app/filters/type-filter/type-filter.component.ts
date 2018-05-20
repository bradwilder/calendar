import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../filters.service';
import { CalendarService } from '../../calendar/calendar.service';
import { EventType } from '../../shared/event-type.model';
import { Event } from '../../shared/event.model';

@Component
({
	selector: 'app-type-filter',
	templateUrl: './type-filter.component.html'
})
export class TypeFilterComponent implements OnInit
{
	private static filterName = 'type';
	private static emptyEventType: EventType = new EventType('', '');
	eventTypes: EventType[] = [];
	selectedType = '';
	
	constructor(private filtersService: FiltersService, private calendarService: CalendarService) {}
	
	ngOnInit()
	{
		this.calendarService.getEventTypes().subscribe((res) => 
		{
			this.eventTypes = res;
			this.eventTypes.unshift(TypeFilterComponent.emptyEventType);
		});
	}
	
	onChange(eventType: string)
	{
		this.selectedType = eventType;
		
		if (eventType)
		{
			this.filtersService.addFilter(TypeFilterComponent.filterName, this.filterFunction.bind(this));
		}
		else
		{
			this.onClear();
		}
	}
	
	onClear()
	{
		this.filtersService.removeFilter(TypeFilterComponent.filterName);
	}
	
	filterFunction(event: Event)
	{
		return event.eventCode === this.selectedType;
	}
}
