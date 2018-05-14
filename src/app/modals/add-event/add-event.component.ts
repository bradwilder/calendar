import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from '../../calendar/calendar.service';
import { NgForm } from '@angular/forms';
import { Event } from '../../shared/event.model';

@Component
({
	selector: 'app-add-event',
	templateUrl: './add-event.component.html'
})
export class AddEventComponent implements OnInit
{
	eventTypes = [];
	@Input() date: Date;
	
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
		const event = new Event(form.value.name, form.value.type, this.date, form.value.description);
		
		this.calendarService.addEvent(event);
		this.activeModal.dismiss();
	}
}

@Component
({
	selector: 'app-add-event-modal',
	templateUrl: './add-event-modal.component.html'
})
export class AddEventModalComponent
{
	@Input() date: Date;
	
	constructor(private modalService: NgbModal) {}
	
	open()
	{
		const modalRef = this.modalService.open(AddEventComponent);
		modalRef.componentInstance.date = this.date;
	}
}