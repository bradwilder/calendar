import { Component, OnInit, OnDestroy, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarBaseModel } from '../calendar-base.model';
import { CalendarViewType } from '../calendar-view-type.enum';
import { MonthCalendarSubComponent } from './month-calendar-sub/month-calendar-sub.component';

@Component
({
	selector: 'app-month-calendar',
	templateUrl: './month-calendar.component.html',
	providers: [CalendarBaseModel],
	encapsulation: ViewEncapsulation.None
})
export class MonthCalendarComponent implements OnInit, OnDestroy
{
	componentRef: ComponentRef<MonthCalendarSubComponent>;
	@ViewChild("cal", { read: ViewContainerRef }) container;
	
	constructor(private calendarModel: CalendarBaseModel, private resolver: ComponentFactoryResolver) {}
	
	ngOnInit()
	{
		this.calendarModel.options = Object.assign(this.calendarModel.options,
		{
			adjacentDaysChangeMonth: true,
			clickEvents:
			{
				onMonthChange: this.calendarModel.changeMonth.bind(this.calendarModel)
			},
			render: this.render.bind(this)
		});
		
		this.calendarModel.init(CalendarViewType.Month);
	}
	
	render(data: any)
	{
		if (this.componentRef)
		{
			this.componentRef.destroy();
		}
		
		const factory = this.resolver.resolveComponentFactory(MonthCalendarSubComponent);
		this.componentRef = this.container.createComponent(factory);
		
		this.componentRef.instance.month = data.month;
		this.componentRef.instance.year = data.year;
		this.componentRef.instance.daysOfTheWeek = data.daysOfTheWeek;
		const weeks = data.days.length / 7;
		let weeksArr = Array(weeks);
		for (let week = 0; week < weeks; week++)
		{
			weeksArr[week] = Array(7);
			for (let day = 0; day < 7; day++)
			{
				weeksArr[week][day] = data.days[week * 7 + day];
			}
		}
		this.componentRef.instance.weeks = weeksArr;
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
