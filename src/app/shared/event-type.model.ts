export class EventType
{
	_id: string;
	name: string;
	iconFileStr: string;
	
	constructor(id: string, name: string)
	{
		this._id = id;
		this.name = name;
	}
}