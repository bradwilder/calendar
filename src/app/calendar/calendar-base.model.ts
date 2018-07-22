import { Subscription } from "rxjs/Subscription";
import { CalendarService } from "./calendar.service";
import { Injectable } from "@angular/core";
import { CalendarViewType } from "./calendar-view-type.enum";
import { Event } from '../shared/event.model';
import { FiltersService } from "../filters/filters.service";
import { TodayService } from "./today.service";
import { SelectedDateService } from "./selectedDate.service";

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
	
	constructor(private calendarService: CalendarService, private filtersService: FiltersService, private todayService: TodayService, private selectedDateService: SelectedDateService) {}
	
	init(mode: CalendarViewType)
	{
		this.mode = mode;
		
		this.options['events'] = this.calendarService.getFilteredEvents();
		
		this.eventsSubscription = this.calendarService.filteredEventsChanged.subscribe((events: Event[]) =>
		{
			this.options['events'] = events;
			
			if (this.clndr)
			{
				this.clndr.setEvents(this.options['events']);
			}
		});
		
		this.todaySubscription = this.todayService.todayChanged.subscribe(this.mode === CalendarViewType.Month ? this.createMonthCalendar.bind(this) : this.createYearCalendar.bind(this));
		
		this.mode === CalendarViewType.Month ? this.createMonthCalendar() : this.createYearCalendar();
	}
	
	onDestroy()
	{
		this.destroyCalendar();
		this.eventsSubscription.unsubscribe();
		this.todaySubscription.unsubscribe();
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
		this.selectedDateService.selectedMonth = month.month();
		this.selectedDateService.selectedYear = month.year();
	}
	
	changeInterval(start, end)
	{
		this.selectedDateService.selectedYear = start.year();
	}
	
	private createYearCalendar()
	{
		this.destroyCalendar();
		
		this.options['startWithMonth'] = this.todayService.getToday().getFullYear() + "-01-01";
		
		this.clndr = $('#cal').clndr(this.options);
		
		if (this.selectedDateService.hasDifferingSelectedYear())
		{
			this.clndr.setYear(this.selectedDateService.selectedYear);
		}
	}
	
	private createMonthCalendar()
	{
		this.destroyCalendar();
		
		this.clndr = $('#cal').clndr(this.options);
		
		if (this.selectedDateService.hasDifferingSelectedMonth())
		{
			this.clndr.setYear(this.selectedDateService.selectedYear);
			this.clndr.setMonth(this.selectedDateService.selectedMonth);
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