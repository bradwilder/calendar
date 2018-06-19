import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FiltersService } from './filters.service';
import { CalendarService } from '../calendar/calendar.service';

@Component
({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class FiltersComponent implements OnInit
{
	enabled = false;
	open = false;
	filteredEventCount = 0;
	
	constructor(private filtersService: FiltersService, private calendarService: CalendarService) {}
	
	ngOnInit()
	{
		this.filteredEventCount = this.calendarService.getFilteredEventCount();
		
		this.calendarService.filteredCountChanged.subscribe((count) =>
		{
			this.filteredEventCount = count;
		});
	}
	
	onEnable()
	{
		this.filtersService.setEnabled(this.enabled);
	}
	
	onClear()
	{
		this.enabled = false;
		this.filtersService.clear();
	}
}
