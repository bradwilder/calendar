import { Subject } from "rxjs/Subject";
import { OnDestroy } from "@angular/core";

export class TodayService implements OnDestroy
{
	private today: Date;
	todayChanged = new Subject<Date>();
	private checkDateInterval: number;
	
	constructor()
	{
		this.today = new Date();
		this.todayChanged.next(new Date(this.today.getTime()));
		
		this.checkDateInterval = window.setInterval(() =>
		{
			this.checkDate();
		}, 10000);
	}
	
	private checkDate()
	{
		const now = new Date();
		
		if (!this.today || now.getFullYear() != this.today.getFullYear() || now.getMonth() != this.today.getMonth() || now.getDate() != this.today.getDate())
		{
			this.today = now;
			this.todayChanged.next(this.today);
		}
	}
	
	getToday() : Date
	{
		return new Date(this.today.getTime());
	}
	
	ngOnDestroy()
	{
		window.clearInterval(this.checkDateInterval);
	}
}