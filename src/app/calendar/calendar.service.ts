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
	eventsChanged = new Subject<Event[]>();
	currMonth: number;
	currYear: number;
	filtersSubscription: Subscription;
	
	constructor(private dataService: DataService, private filtersService: FiltersService, public todayService: TodayService)
	{
		this.currYear = this.todayService.today.getFullYear();
		this.currMonth = this.todayService.today.getMonth();
		this.updateEvents();
		
		this.filtersSubscription = this.filtersService.filtersChanged.subscribe(() =>
		{
			this.eventsChanged.next(this.getEvents());
		});
	}
	
	getEvents()
	{
		return this.filtersService.filter(this.events);
	}
	
	getEventsCount()
	{
		return this.filtersService.filter(this.events).length;
	}
	
	private updateEvents()
	{
		this.dataService.getEvents().subscribe((res) => 
		{
			this.events = res;
			this.eventsChanged.next(this.getEvents());
		});
	}
	
	addEvent(event: Event)
	{
		this.dataService.addEvent(event).subscribe(() =>
		{
			this.updateEvents();
		}));
	}
	
	updateEvent(event: Event)
	{
		this.dataService.updateEvent(event).subscribe(() =>
		{
			this.updateEvents();
		});
	}
	
	deleteEvent(event: Event)
	{
		this.dataService.deleteEvent(event).subscribe(() =>
		{
			this.updateEvents();
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
			this.updateEvents();
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