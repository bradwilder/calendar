import { Component, Input } from '@angular/core';
import { CalendarViewType } from '../calendar-view-type.enum';
import { CalendarBaseModel } from '../calendar-base.model';

@Component
({
	selector: 'app-calendar-controls',
	templateUrl: './calendar-controls.component.html',
	styleUrls: ['./calendar-controls.component.scss']
})
export class CalendarControlsComponent
{
	@Input() title: string;
	@Input() calendarModel: CalendarBaseModel;
}
