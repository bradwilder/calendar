import { Event } from '../shared/event.model';
import { Subject } from 'rxjs/Subject';

export class FiltersService
{
	private filters = {};
	filtersChanged = new Subject<void>();
	
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
	
	removeFilters()
	{
		this.filters = {};
		
		this.filtersChanged.next();
	}
	
	filter(events: Event[]): Event[]
	{
		let filtered = events.slice();
		
		for (const filterName in this.filters)
		{
			if (this.filters.hasOwnProperty(filterName))
			{
				filtered = filtered.filter(this.filters[filterName]);
			}
		}
		
		return filtered;
	}
}