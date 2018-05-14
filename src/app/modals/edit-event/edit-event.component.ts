import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../shared/event.model';
import { CalendarService } from '../../calendar/calendar.service';
import { NgForm } from '@angular/forms';

@Component
({
	selector: 'app-edit-event',
	templateUrl: './edit-event.component.html'
})
export class EditEventComponent implements OnInit
{
	eventTypes = [];
	@Input() event: Event;
	
	constructor(private activeModal: NgbActiveModal, private calendarService: CalendarService) {}
	
	ngOnInit()
	{
		this.calendarService.getEventTypes().subscribe((res) => 
		{
			this.eventTypes = res;
		});
	}
	
	onSubmit(form: NgForm)
	{
		this.calendarService.updateEvent(this.event);
		this.activeModal.dismiss();
	}
	
	onDelete()
	{
		if (confirm('Are you sure you want to delete this event?'))
		{
			this.calendarService.deleteEvent(this.event);
			this.activeModal.dismiss();
		}
	}
	
	getDateString()
	{
		return new Date(this.event.date).toLocaleDateString('en-US');
	}
}

@Component
({
	selector: 'app-edit-event-modal',
	templateUrl: './edit-event-modal.component.html'
})
export class EditEventModalComponent
{
	@Input() event: Event;
	
	constructor(private modalService: NgbModal) {}
	
	open()
	{
		const modalRef = this.modalService.open(EditEventComponent);
		modalRef.componentInstance.event = this.event;
	}
}
