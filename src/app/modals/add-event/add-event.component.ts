import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from '../../calendar/calendar.service';
import { NgForm } from '@angular/forms';

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
		this.calendarService.addEvent(this.date, form.value.name, form.value.type, form.value.description);
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