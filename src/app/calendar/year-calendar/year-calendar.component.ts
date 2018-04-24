import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component
({
	selector: 'app-year-calendar',
	templateUrl: './year-calendar.component.html',
	styleUrls: ['./year-calendar.component.css']
})
export class YearCalendarComponent implements OnInit
{
	@Input() options: Object;
	clndr;
	
	constructor() {}
	
	ngOnInit()
	{
		this.clndr = $('#cal-year').clndr(this.options);
	}
}
