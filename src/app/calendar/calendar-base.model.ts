import { Subscription } from "rxjs/Subscription";
import { CalendarService } from "./calendar.service";
import { Injectable } from "@angular/core";
import { CalendarViewType } from "./calendar-view-type.enum";
import { Event } from '../shared/event.model';
import { FiltersService } from "../filters/filters.service";

declare var $: any;

@Injectable()
export class CalendarBaseModel
{
	eventsSubscription: Subscription;
	todaySubscription: Subscription;
	clndr;
	options: Object =
	{
		daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		trackSelectedDate: true,
		events: []
	};
	mode: CalendarViewType;
	
	constructor(public calendarService: CalendarService, private filtersService: FiltersService) {}
	
	init(mode: CalendarViewType)
	{
		this.mode = mode;
		
		this.eventsSubscription = this.calendarService.filteredEventsChanged.subscribe((events: Event[]) =>
		{
			this.options['events'] = events;
			
			if (this.clndr)
			{
				this.clndr.setEvents(this.options['events']);
			}
		});
		
		this.todaySubscription = this.calendarService.todayService.todayChanged.subscribe(this.mode === CalendarViewType.Month ? this.createMonthCalendar.bind(this) : this.createYearCalendar.bind(this));
		
		this.mode === CalendarViewType.Month ? this.createMonthCalendar() : this.createYearCalendar();
	}
	
	onDestroy()
	{
		this.destroyCalendar();
		this.eventsSubscription.unsubscribe();
		this.todaySubscription.unsubscribe();
		this.filtersService.clear();
	}
	
	previousInterval()
	{
		this.clndr.previous();
	}
	
	nextInterval()
	{
		this.clndr.next();
	}
	
	changeMonth(month)
	{
		this.calendarService.currMonth = month.month();
		this.calendarService.currYear = month.year();
	}
	
	changeInterval(start, end)
	{
		this.calendarService.currYear = start.year();
	}
	
	private createYearCalendar()
	{
		this.destroyCalendar();
		
		this.options['startWithMonth'] = this.calendarService.todayService.today.getFullYear() + "-01-01";
		
		this.clndr = $('#cal').clndr(this.options);
		
		if (this.calendarService.hasDifferingCurrentYear())
		{
			this.clndr.setYear(this.calendarService.currYear);
		}
	}
	
	private createMonthCalendar()
	{
		this.destroyCalendar();
		
		this.clndr = $('#cal').clndr(this.options);
		
		if (this.calendarService.hasDifferingCurrentMonth())
		{
			this.clndr.setYear(this.calendarService.currYear);
			this.clndr.setMonth(this.calendarService.currMonth);
		}
	}
	
	private destroyCalendar()
	{
		if (this.clndr)
		{
			this.clndr.destroy();
		}
	}
}