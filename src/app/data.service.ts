import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService
{
    result: any;
    
    constructor(private _http: Http) {}
    
	getEvents()
    {
		return this._http.get("/api/events").map((result) =>
		{
			return this.result = result.json().data
		});
    }
}