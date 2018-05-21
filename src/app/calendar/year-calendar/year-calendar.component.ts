import { Component, OnInit, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarBaseModel } from '../calendar-base.model';
import { CalendarViewType } from '../calendar-view-type.enum';
import { YearCalendarSubComponent } from './year-calendar-sub/year-calendar-sub.component';

@Component
({
	selector: 'app-year-calendar',
	templateUrl: './year-calendar.component.html',
	styleUrls: ['./year-calendar.component.scss'],
	providers: [CalendarBaseModel],
	encapsulation: ViewEncapsulation.None
})
export class YearCalendarComponent implements OnInit, OnDestroy
{
	componentRef: ComponentRef<YearCalendarSubComponent>;
	@ViewChild("dummy", { read: ViewContainerRef }) container;
	
	constructor(private calendarModel: CalendarBaseModel, private resolver: ComponentFactoryResolver) {}
	
	ngOnInit()
	{
		this.calendarModel.options = Object.assign(this.calendarModel.options,
		{
			showAdjacentMonths: false,
			clickEvents:
			{
				onIntervalChange: this.calendarModel.changeInterval.bind(this.calendarModel)
			},
			lengthOfTime:
			{
				months: 12,
				days: null,
				interval: 12
			},
			render: this.render.bind(this)
		});
		
		this.calendarModel.init(CalendarViewType.Year);
	}
	
	render(data: any)
	{
		if (this.componentRef)
		{
			this.componentRef.destroy();
		}
		
		const factory = this.resolver.resolveComponentFactory(YearCalendarSubComponent);
		this.componentRef = this.container.createComponent(factory);
		this.componentRef.instance.year = data.intervalStart.year();
		this.componentRef.instance.daysOfTheWeek = data.daysOfTheWeek;
		let months = data.months.slice();
		months.forEach(month =>
		{
			const weeks = month.days.length / 7;
			month.weeks = Array(weeks);
			for (let week = 0; week < weeks; week++)
			{
				month.weeks[week] = Array(7);
				for (let day = 0; day < 7; day++)
				{
					month.weeks[week][day] = month.days[week * 7 + day];
				}
			}
		});
		this.componentRef.instance.months = months;
		this.componentRef.instance.calendarModel = this.calendarModel;
	}
	
	ngOnDestroy()
	{
		this.calendarModel.onDestroy();
		if (this.componentRef)
		{
			this.componentRef.destroy();
		}
	}
}
