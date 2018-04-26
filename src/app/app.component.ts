import { Component, Output } from '@angular/core';

import { DataService } from './data.service';

declare var $: any;

@Component
({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent
{
	today: Date;
	showing: string;
	events: Array<any>;
	currMonth: number;
	currYear: number;
	
	constructor(private _dataService: DataService)
	{
		this.today = new Date();
		this.showing = 'Month';
		this._dataService.getEvents()
			.subscribe(res => this.events = res);
		
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
	
	onMonthChanged(momentObj: any)
	{
		this.currMonth = momentObj.month();
		this.currYear = momentObj.year();
	}
	
	onYearChanged(interval: any)
	{
		this.currYear = interval.start.year();
	}
}
