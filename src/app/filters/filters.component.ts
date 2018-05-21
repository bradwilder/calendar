import { Component, ViewEncapsulation } from '@angular/core';
import { CalendarService } from '../calendar/calendar.service';
import { FiltersService } from './filters.service';

@Component
({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class FiltersComponent
{
	enabled = false;
	open = false;
	
	constructor(private calendarService: CalendarService, private filtersService: FiltersService) {}
	
	onOpenToggle()
	{
		this.open = !this.open;
	}
	
	onEnable(enabled: boolean)
	{
		this.enabled = enabled;
		this.filtersService.setEnabled(this.enabled);
	}
	
	onClear()
	{
		this.filtersService.clear();
	}
}
