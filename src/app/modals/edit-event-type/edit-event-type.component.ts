import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventType } from '../../shared/event-type.model';
import { CalendarService } from '../../calendar/calendar.service';
import { NgForm } from '@angular/forms';

@Component
({
	selector: 'app-edit-event-type',
	templateUrl: './edit-event-type.component.html'
})
export class EditEventTypeComponent implements OnInit
{
	@Input() eventType: EventType;
	file;
	canDelete = false;
	
	constructor(private activeModal: NgbActiveModal, private calendarService: CalendarService) {}
	
	ngOnInit()
	{
		this.calendarService.canDeleteEventType(this.eventType).subscribe((res) => 
		{
			this.canDelete = res;
		});
	}
	
	getFile(event: any)
	{
		this.file = event.target.files[0];
		var reader = new FileReader();
        reader.onload = this.onReaderLoaded.bind(this);
		reader.readAsText(this.file);
	}
	
	private onReaderLoaded(readerEvt)
	{
		this.eventType.iconFileStr = readerEvt.target.result;
	} 
	
	onSubmit(form: NgForm)
	{
		this.calendarService.updateEventType(this.eventType);
		this.activeModal.dismiss();
	}
	
	onDelete()
	{
		if (confirm('Are you sure you want to delete this event type?'))
		{
			this.calendarService.deleteEventType(this.eventType);
			this.activeModal.dismiss();
		}
	}
}

@Component
({
	selector: 'app-edit-event-type-modal',
	templateUrl: './edit-event-type-modal.component.html'
})
export class EditEventTypeModalComponent
{
	@Input() eventType: EventType;
	
	constructor(private modalService: NgbModal) {}
	
	open()
	{
		const modalRef = this.modalService.open(EditEventTypeComponent);
		modalRef.componentInstance.eventType = this.eventType;
	}
}
