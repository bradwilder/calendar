import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { MonthCalendarComponent } from "./calendar/month-calendar/month-calendar.component";
import { YearCalendarComponent } from "./calendar/year-calendar/year-calendar.component";

const appRoutes: Routes =
[
	{path: '', redirectTo: '/month', pathMatch: 'full'},
	{path: 'month', component: MonthCalendarComponent},
	{path: 'year', component: YearCalendarComponent}
]

@NgModule
({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}