import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { MonthCalendarComponent } from "./calendar/month-calendar/month-calendar.component";
import { YearCalendarComponent } from "./calendar/year-calendar/year-calendar.component";
import { ConfigComponent } from "./config/config.component";

const appRoutes: Routes =
[
	{path: '', redirectTo: '/cal/month', pathMatch: 'full'},
	{path: 'cal/month', component: MonthCalendarComponent},
	{path: 'cal/year', component: YearCalendarComponent},
	{path: 'config', component: ConfigComponent}
]

@NgModule
({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}