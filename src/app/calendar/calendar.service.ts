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
	currMonth: number;
	currYear: number;
	filtersSubscription: Subscription;
	
	constructor(private dataService: DataService, private filtersService: FiltersService, private todayService: TodayService)
	{
		this.currYear = this.todayService.today.getFullYear();
		this.currMonth = this.todayService.today.getMonth();
		this.getEvents();
		
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
	
	getEventTypes()
	{
		return this.dataService.getEventTypes();
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
	
	hasDifferingCurrentYear()
	{
		return this.currYear != this.todayService.today.getFullYear();
	}
	
	hasDifferingCurrentMonth()
	{
		return this.currYear != this.todayService.today.getFullYear() || this.currMonth != this.todayService.today.getMonth();
	}
	
	ngOnDestroy()
	{
		this.filtersSubscription.unsubscribe();
	}
}