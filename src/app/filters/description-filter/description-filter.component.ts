import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FiltersService } from '../filters.service';
import { CalendarService } from '../../calendar/calendar.service';
import { Event } from '../../shared/event.model';

@Component
({
	selector: 'app-description-filter',
	templateUrl: './description-filter.component.html'
})
export class DescriptionFilterComponent implements OnInit, OnDestroy
{
	private static filterName = 'desc';
	selectedValue = '';
	enabled = false;
	filtersEnabled = false;
	enabledSubscription: Subscription;
	clearedSubscription: Subscription;
	inputTimeout: number;
	
	constructor(private filtersService: FiltersService, private calendarService: CalendarService) {}
	
	ngOnInit()
	{
		this.enabledSubscription = this.filtersService.enabledChanged.subscribe((enabled) =>
		{
			this.filtersEnabled = enabled;
		});
		
		this.clearedSubscription = this.filtersService.cleared.subscribe(() =>
		{
			this.onClear();
			this.enabled = false;
			this.onEnable();
		});
	}
	
	onInput()
	{
		this.clearTimeout();
		
		this.inputTimeout = window.setTimeout(() =>
		{
			this.doFilter();
		}, 2000);
	}
	
	doFilter()
	{
		if (this.selectedValue)
		{
			this.filtersService.addFilter(DescriptionFilterComponent.filterName, this.filterFunction.bind(this));
		}
		else
		{
			this.filtersService.removeFilter(DescriptionFilterComponent.filterName);
		}
	}
	
	onEnable()
	{
		if (this.enabled)
		{
			if (this.selectedValue)
			{
				this.filtersService.addFilter(DescriptionFilterComponent.filterName, this.filterFunction.bind(this));
			}
		}
		else
		{
			this.filtersService.removeFilter(DescriptionFilterComponent.filterName);
			this.clearTimeout();
		}
	}
	
	onClear()
	{
		this.clearTimeout();
		this.selectedValue = '';
		this.filtersService.removeFilter(DescriptionFilterComponent.filterName);
	}
	
	filterFunction(event: Event)
	{
		return event.description && event.description.indexOf(this.selectedValue) !== -1;
	}
	
	clearTimeout()
	{
		if (this.inputTimeout)
		{
			window.clearTimeout(this.inputTimeout);
		}
	}
	
	ngOnDestroy()
	{
		this.enabledSubscription.unsubscribe();
		this.clearedSubscription.unsubscribe();
		
		this.clearTimeout();
	}
}
