import { Subject } from "rxjs/Subject";
import { OnDestroy } from "@angular/core";

export class TodayService implements OnDestroy
{
	today: Date;
	todayChanged = new Subject<void>();
	interval: number;
	
	constructor()
	{
		this.today = new Date();
		
		this.interval = window.setInterval(() =>
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
			this.todayChanged.next();
		}
	}
	
	ngOnDestroy()
	{
		window.clearInterval(this.interval);
	}
}