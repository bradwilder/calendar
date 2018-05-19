import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventType } from '../../shared/event-type.model';
import { CalendarService } from '../../calendar/calendar.service';
import { NgForm } from '@angular/forms';

@Component
({
	selector: 'app-add-event-type',
	templateUrl: './add-event-type.component.html'
})
export class AddEventTypeComponent
{
	file;
	fileStr;
	
	constructor(private activeModal: NgbActiveModal, private calendarService: CalendarService) {}
	
	getFile(event: any)
	{
		this.file = event.target.files[0];
		if (this.file)
		{
			var reader = new FileReader();
			reader.onload = this.onReaderLoaded.bind(this);
			reader.readAsText(this.file);
		}
		else
		{
			this.fileStr = null;
		}
	}
	
	private onReaderLoaded(readerEvt)
	{
		this.fileStr = readerEvt.target.result;
	}
	
	onSubmit(form: NgForm)
	{
		let eventType = new EventType(form.value.code, form.value.name);
		eventType.iconFileStr = this.fileStr;
		
		this.calendarService.addEventType(eventType);
		this.activeModal.dismiss();
	}
}

@Component
({
	selector: 'app-add-event-type-modal',
	templateUrl: './add-event-type-modal.component.html'
})
export class AddEventTypeModalComponent
{
	constructor(private modalService: NgbModal) {}
	
	open()
	{
		const modalRef = this.modalService.open(AddEventTypeComponent);
	}
}
