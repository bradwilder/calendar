import { DataService } from "../data.service";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class CalendarService
{
	today: Date;
	todayChanged = new Subject<void>();
	private events = [];
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
	
	addEvent(date: Date, name: string, eventCode: string, description: string)
	{
		const newEvent = {date: date, name: name, description: description, eventCode: eventCode};
		
		this.dataService.addEvent(newEvent).subscribe(null);
		
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
	
	hasDifferingCurrentYear()
	{
		return this.currYear != this.today.getFullYear();
	}
	
	hasDifferingCurrentMonth()
	{
		return this.currYear != this.today.getFullYear() || this.currMonth != this.today.getMonth();
	}
}