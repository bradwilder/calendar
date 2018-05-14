import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService
{
	constructor(private _http: Http) {}
	
	getEvents()
    {
		return this._http.get("/api/events").map((result) => result.json().data);
	}
	
	addEvent(event: any)
	{
		return this._http.post("/api/addEvent", event);
	}
	
	getEventTypes()
    {
		return this._http.get("/api/event-types").map((result) => result.json().data);
    }
}