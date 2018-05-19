import { DataService } from "../data.service";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { Event } from '../shared/event.model';
import { EventType } from "../shared/event-type.model";

@Injectable()
export class CalendarService
{
	today: Date;
	todayChanged = new Subject<void>();
	private events: Array<Event> = [];
	eventsChanged = new Subject<Array<any>>();
	currMonth: number;
	currYear: number;
	
	constructor(private dataService: DataService)
	{
		this.today = new Date();
		this.currYear = this.today.getFullYear();
		this.currMonth = this.today.getMonth();
		this.dataService.getEvents().subscribe((res) => 
		{
			this.events = res;
			this.eventsChanged.next(this.getEvents());
		});
		
		window.setInterval(() =>
		{
			this.checkDate();
		}, 10000);
	}
	
	checkDate()
	{
		const now = new Date();
		
		if (!this.today || now.getFullYear() != this.today.getFullYear() || now.getMonth() != this.today.getMonth() || now.getDate() != this.today.getDate())
		{
			this.today = now;
			
			this.todayChanged.next();
		}
	}
	
	getEvents()
	{
		return this.events.slice();
	}
	
	addEvent(event: Event)
	{
		this.dataService.addEvent(event).subscribe(null);
		
		this.dataService.getEvents().subscribe((res) => 
		{
			this.events = res;
			this.eventsChanged.next(this.getEvents());
		});
	}
	
	updateEvent(event: Event)
	{
		this.dataService.updateEvent(event).subscribe(null);
		
		this.dataService.getEvents().subscribe((res) => 
		{
			this.events = res;
			this.eventsChanged.next(this.getEvents());
		});
	}
	
	deleteEvent(event: Event)
	{
		this.dataService.deleteEvent(event).subscribe(null);
		
		this.dataService.getEvents().subscribe((res) => 
		{
			this.events = res;
			this.eventsChanged.next(this.getEvents());
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
		this.dataService.updateEventType(eventType).subscribe(null);
		
		this.dataService.getEvents().subscribe((res) => 
		{
			this.events = res;
			this.eventsChanged.next(this.getEvents());
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
		return this.currYear != this.today.getFullYear();
	}
	
	hasDifferingCurrentMonth()
	{
		return this.currYear != this.today.getFullYear() || this.currMonth != this.today.getMonth();
	}
}