import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Event } from './shared/event.model'
import { Observable } from 'rxjs/Observable';
import { EventType } from './shared/event-type.model';

@Injectable()
export class DataService
{
	constructor(private _http: Http) {}
	
	getEvents(): Observable<Array<Event>>
    {
		return this._http.get("/api/events").map((result) =>
		{
			const eventsData = result.json().data;
			return eventsData.map((eventData) =>
			{
				let event = new Event(eventData.name, eventData.eventCode, eventData.date, eventData.description);
				event.id = eventData._id;
				return event;
			});
		});
	}
	
	addEvent(event: Event)
	{
		return this._http.post("/api/addEvent", event);
	}
	
	updateEvent(event: Event)
	{
		return this._http.post("/api/updateEvent", event);
	}
	
	deleteEvent(event: Event)
	{
		return this._http.post("/api/deleteEvent", {id: event.id});
	}
	
	getEventTypes()
    {
		return this._http.get("/api/event-types").map((result) => result.json().data);
	}
	
	updateEventType(eventType: EventType)
	{
		return this._http.post("/api/updateEventType", eventType);
	}
	
	canDeleteEventType(eventType: EventType)
	{
		return this._http.get("/api/eventsByType?type=" + eventType._id).map((result) => result.json().data === 0);
	}
	
	deleteEventType(eventType: EventType)
	{
		return this._http.post("/api/deleteEventType", {id: eventType._id});
	}
}