import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

@Component
({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent
{
	events: Array<any>;
	
	constructor(private _dataService: DataService)
	{
		this._dataService.getEvents()
			.subscribe(res => this.events = res);
	}
}
