import { Subject } from "rxjs/Subject";
import { OnDestroy } from "@angular/core";

export class TodayService implements OnDestroy
{
	today: Date;
	todayChanged = new Subject<Date>();
	private checkDateInterval: number;
	
	constructor()
	{
		this.today = new Date();
		this.todayChanged.next(this.today);
		
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
	
	ngOnDestroy()
	{
		window.clearInterval(this.checkDateInterval);
	}
}