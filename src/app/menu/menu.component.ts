import { Component, Output, EventEmitter } from '@angular/core';
import 'bootstrap';

@Component
({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent
{
	@Output() viewChanged : EventEmitter<string> = new EventEmitter<string>();
	
	constructor() {}
	
	selectedViewType: string = "Month";
	
	onViewTypeSelected(newViewType: string)
	{
		this.selectedViewType = newViewType;
		this.viewChanged.emit(newViewType);
	}
}
