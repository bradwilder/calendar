import { DataService } from "../data.service";
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";

@Injectable()
export class CalendarService
{
	today: Date;
	private events: Array<any>;
	eventsChanged = new Subject<Array<any>>();
	currMonth: number;
	currYear: number;
	
	constructor(private _dataService: DataService)
	{
		this.today = new Date();
		this._dataService.getEvents().subscribe((res) => 
		{
			this.events = res;
			this.eventsChanged.next(this.events.slice());
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
		}
	}
	
	getEvents()
	{
		return this.events ? this.events.slice() : [];
	}
}