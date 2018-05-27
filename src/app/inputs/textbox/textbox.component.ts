import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component
({
	selector: 'app-textbox',
	templateUrl: './textbox.component.html',
	styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent
{
	@Input() text = '';
	@Input() enabled = true;
	@Input() placeholder = '';
	@Input() font = '';
	@Input() size = 50;
	@Input() name = 'app-textbox';
	@Output() textChange = new EventEmitter<string>();
	
	onChange()
	{
		this.textChange.emit(this.text);
	}
}
