import { DataService } from "../data.service";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class CalendarService
{
	today: Date;
	todayChanged = new Subject<void>();
	private events: Array<any> = [];
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
	
	hasDifferingCurrentYear()
	{
		return this.currYear != this.today.getFullYear();
	}
	
	hasDifferingCurrentMonth()
	{
		return this.currYear != this.today.getFullYear() || this.currMonth != this.today.getMonth();
	}
}