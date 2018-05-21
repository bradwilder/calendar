import { Event } from '../shared/event.model';
import { Subject } from 'rxjs/Subject';

export class FiltersService
{
	private filters = {};
	filtersChanged = new Subject<void>();
	enabled = false;
	enabledChanged = new Subject<boolean>();
	cleared = new Subject<void>();
	
	setEnabled(enabled: boolean)
	{
		this.enabled = enabled;
		this.filtersChanged.next();
		this.enabledChanged.next(this.enabled);
	}
	
	addFilter(filterName: string, filter: Function)
	{
		this.removeFilter(filterName);
		this.filters[filterName] = filter;
		
		this.filtersChanged.next();
	}
	
	removeFilter(name: string)
	{
		delete this.filters[name];
		
		this.filtersChanged.next();
	}
	
	clear()
	{
		this.removeFilters();
		this.cleared.next();
	}
	
	private removeFilters()
	{
		this.filters = {};
		
		this.filtersChanged.next();
	}
	
	filter(events: Event[]): Event[]
	{
		let filtered = events.slice();
		
		if (this.enabled)
		{
			for (const filterName in this.filters)
			{
				if (this.filters.hasOwnProperty(filterName))
				{
					filtered = filtered.filter(this.filters[filterName]);
				}
			}
		}
		
		return filtered;
	}
}