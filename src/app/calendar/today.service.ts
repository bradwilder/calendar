import { Subject } from "rxjs/Subject";

export class TodayService
{
	today: Date;
	todayChanged = new Subject<void>();
	
	constructor()
	{
		this.today = new Date();
		
		window.setInterval(() =>
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
}