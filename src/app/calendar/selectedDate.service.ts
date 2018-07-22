import { TodayService } from "./today.service";
import { Injectable } from "../../../node_modules/@angular/core";

@Injectable()
export class SelectedDateService
{
	selectedMonth: number;
	selectedYear: number;
	
	constructor(private todayService: TodayService)
	{
		let today = this.todayService.getToday();
		this.selectedYear = today.getFullYear();
		this.selectedMonth = today.getMonth();
	}
	
	hasDifferingSelectedYear()
	{
		return this.selectedYear != this.todayService.getToday().getFullYear();
	}
	
	hasDifferingSelectedMonth()
	{
		let today = this.todayService.getToday();
		return this.selectedYear != today.getFullYear() || this.selectedMonth != today.getMonth();
	}
}