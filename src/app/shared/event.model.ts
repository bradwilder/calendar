export class Event
{
	id: string;
	name: string;
	description: string;
	eventCode: string;
	date: Date;
	
	constructor(name: string, eventCode: string, date: Date, description?: string)
	{
		this.name = name;
		this.eventCode = eventCode;
		this.date = date;
		this.description = description;
	}
}