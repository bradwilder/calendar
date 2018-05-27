import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component
({
	selector: 'app-toggle-switch',
	templateUrl: './toggle-switch.component.html',
	styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent
{
	@Input() on = false;
	@Input() enabled = true;
	@Input() name = 'app-toggle-switch';
	@Output() onChange = new EventEmitter<boolean>();
	
	onChanged()
	{
		this.onChange.emit(this.on);
	}
}
