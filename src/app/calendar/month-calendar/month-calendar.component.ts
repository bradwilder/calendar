import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component
({
	selector: 'app-month-calendar',
	templateUrl: './month-calendar.component.html',
	styleUrls: ['./month-calendar.component.css']
})
export class MonthCalendarComponent implements OnInit
{
	@Input() options: Object;
	clndr;
	
	constructor() {}
	
	ngOnInit()
	{
		this.clndr = $('#cal-month').clndr(this.options);
	}
}
