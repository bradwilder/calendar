import { Component, OnInit, OnDestroy } from '@angular/core';
import { FiltersService } from '../filters.service';
import { CalendarService } from '../../calendar/calendar.service';
import { EventType } from '../../shared/event-type.model';
import { Event } from '../../shared/event.model';
import { Subscription } from 'rxjs/Subscription';

@Component
({
	selector: 'app-type-filter',
	templateUrl: './type-filter.component.html'
})
export class TypeFilterComponent implements OnInit, OnDestroy
{
	private static filterName = 'type';
	private static emptyEventType: EventType = new EventType('', '');
	eventTypes: EventType[] = [];
	selectedType = '';
	enabled = false;
	filtersEnabled = false;
	enabledSubscription: Subscription;
	clearedSubscription: Subscription;
	
	constructor(private filtersService: FiltersService, private calendarService: CalendarService) {}
	
	ngOnInit()
	{
		this.calendarService.getEventTypes().subscribe((res) => 
		{
			this.eventTypes = res;
			this.eventTypes.unshift(TypeFilterComponent.emptyEventType);
		});
		
		this.enabledSubscription = this.filtersService.enabledChanged.subscribe((enabled) =>
		{
			this.filtersEnabled = enabled;
		});
		
		this.clearedSubscription = this.filtersService.cleared.subscribe(() =>
		{
			this.onClear();
		});
	}
	
	onChange()
	{
		if (this.selectedType != TypeFilterComponent.emptyEventType._id)
		{
			this.filtersService.addFilter(TypeFilterComponent.filterName, this.filterFunction.bind(this));
		}
		else
		{
			this.filtersService.removeFilter(TypeFilterComponent.filterName);
		}
	}
	
	onEnable(enable: boolean)
	{
		this.enabled = enable;
		
		if (this.enabled)
		{
			if (this.selectedType)
			{
				this.filtersService.addFilter(TypeFilterComponent.filterName, this.filterFunction.bind(this));
			}
		}
		else
		{
			this.filtersService.removeFilter(TypeFilterComponent.filterName);
		}
	}
	
	onClear()
	{
		this.selectedType = TypeFilterComponent.emptyEventType._id;
		this.onEnable(false);
	}
	
	filterFunction(event: Event)
	{
		return event.eventCode === this.selectedType;
	}
	
	ngOnDestroy()
	{
		this.enabledSubscription.unsubscribe();
		this.clearedSubscription.unsubscribe();
	}
}
