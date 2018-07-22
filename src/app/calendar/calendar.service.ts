import { DataService } from "../data.service";
import { Subject } from "rxjs/Subject";
import { Injectable, OnDestroy } from "@angular/core";
import { Event } from '../shared/event.model';
import { EventType } from "../shared/event-type.model";
import { FiltersService } from "../filters/filters.service";
import { TodayService } from "./today.service";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class CalendarService implements OnDestroy
{
	private events: Event[] = [];
	private filteredEvents: Event[] = [];
	filteredEventsChanged = new Subject<Event[]>();
	filteredCountChanged = new Subject<number>();
	selectedMonth: number;
	selectedYear: number;
	filtersSubscription: Subscription;
	private eventTypes: EventType[] = [];
	eventTypesChanged = new Subject<EventType[]>();
	
	constructor(private dataService: DataService, private filtersService: FiltersService, private todayService: TodayService)
	{
		let today = this.todayService.getToday();
		this.selectedYear = today.getFullYear();
		this.selectedMonth = today.getMonth();
		this.getEvents();
		this.getEventTypes();
		
		this.filtersSubscription = this.filtersService.filtersChanged.subscribe(() =>
		{
			this.updateFilteredEvents();
		});
	}
	
	private getEvents()
	{
		this.dataService.getEvents().subscribe((res) => 
		{
			this.events = res;
			this.updateFilteredEvents();
		});
	}
	
	private updateFilteredEvents()
	{
		this.filteredEvents = this.filtersService.filter(this.events);
		this.filteredEventsChanged.next(this.filteredEvents);
		this.filteredCountChanged.next(this.filteredEvents.length);
	}
	
	getFilteredEvents()
	{
		return this.filteredEvents;
	}
	
	getFilteredEventCount()
	{
		return this.filteredEvents.length;
	}
	
	addEvent(event: Event)
	{
		this.dataService.addEvent(event).subscribe(() =>
		{
			this.events.push(event);
			this.updateFilteredEvents();
		});
	}
	
	updateEvent(event: Event)
	{
		this.dataService.updateEvent(event).subscribe(() =>
		{
			this.updateFilteredEvents();
		});
	}
	
	deleteEvent(event: Event)
	{
		this.dataService.deleteEvent(event).subscribe(() =>
		{
			const index = this.events.indexOf(event);
			this.events.splice(index, 1);
			this.updateFilteredEvents();
		});
	}
	
	private getEventTypes()
	{
		this.dataService.getEventTypes().subscribe((res) => 
		{
			this.eventTypes = res;
			this.eventTypesChanged.next(this.eventTypes);
		});
	}
	
	addEventType(eventType: EventType)
	{
		this.dataService.addEventType(eventType).subscribe(null, (response) =>
		{
			var message = response.json().message;
			if (message)
			{
				alert('Error: ' +  message);
			}
			else
			{
				this.eventTypes.push(eventType);
				this.eventTypesChanged.next(this.eventTypes);
			}
		});
	}
	
	updateEventType(eventType: EventType)
	{
		this.dataService.updateEventType(eventType).subscribe(() =>
		{
			this.getEvents();
		});
	}
	
	canDeleteEventType(eventType: EventType)
	{
		return this.dataService.canDeleteEventType(eventType);
	}
	
	deleteEventType(eventType: EventType)
	{
		this.dataService.deleteEventType(eventType).subscribe(null);
	}
	
	hasDifferingSelectedYear()
	{
		return this.selectedYear != this.todayService.getToday().getFullYear();
	}
	
	hasDifferingSelectedMonth()
	{
		let today = this.todayService.getToday();
		return this.selectedYear != today.getFullYear() || this.selectedMonth != today.getMonth();
	}
	
	ngOnDestroy()
	{
		this.filtersSubscription.unsubscribe();
	}
}