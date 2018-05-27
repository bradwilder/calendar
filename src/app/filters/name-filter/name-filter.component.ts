import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FiltersService } from '../filters.service';
import { Event } from '../../shared/event.model';

@Component
({
	selector: 'app-name-filter',
	templateUrl: './name-filter.component.html'
})
export class NameFilterComponent implements OnInit, OnDestroy
{
	private static filterName = 'type';
	selectedName = '';
	enabled = false;
	filtersEnabled = false;
	enabledSubscription: Subscription;
	clearedSubscription: Subscription;
	inputTimeout: number;
	
	constructor(private filtersService: FiltersService) {}
	
	ngOnInit()
	{
		this.enabledSubscription = this.filtersService.enabledChanged.subscribe((enabled) =>
		{
			this.filtersEnabled = enabled;
		});
		
		this.clearedSubscription = this.filtersService.cleared.subscribe(() =>
		{
			this.onClear();
		});
	}
	
	onInput(text: string)
	{
		this.selectedName = text;
		
		this.clearTimeout();
		
		this.inputTimeout = window.setTimeout(() =>
		{
			this.doFilter();
		}, 2000);
	}
	
	doFilter()
	{
		if (this.selectedName)
		{
			this.filtersService.addFilter(NameFilterComponent.filterName, this.filterFunction.bind(this));
		}
		else
		{
			this.filtersService.removeFilter(NameFilterComponent.filterName);
		}
	}
	
	onEnable(enable: boolean)
	{
		this.enabled = enable;
		
		if (this.enabled)
		{
			if (this.selectedName)
			{
				this.filtersService.addFilter(NameFilterComponent.filterName, this.filterFunction.bind(this));
			}
		}
		else
		{
			this.filtersService.removeFilter(NameFilterComponent.filterName);
			this.clearTimeout();
		}
	}
	
	onClear()
	{
		this.selectedName = '';
		this.onEnable(false);
	}
	
	filterFunction(event: Event)
	{
		return event.name === this.selectedName;
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
