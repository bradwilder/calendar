const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const path = require('path');

// Connect
const connection = (closure) =>
{
	return MongoClient.connect('mongodb://localhost:27017/calendar', (err, client) =>
	{
		if (err)
		{
			return console.log(err);
		}
		
		let db = client.db('calendar');
		closure(db);
	});
};

// Error handling
const sendError = (err, res) =>
{
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response =
{
    status: 200,
    data: [],
    message: null
};

// Get events
const createEventFromBody = (body) =>
{
	let newEvent =
	{
		name: body.name,
		eventCode: body.eventCode,
		date: new Date(body.date)
	}
	if (body.hasOwnProperty('description'))
	{
		newEvent.description = body.description;
	}
	return newEvent;
}

router.get('/events', (req, res) =>
{
	connection((db) =>
	{
		db.collection('events').find().toArray()
			.then((events) =>
			{
				response.data = events;
				res.json(response);
			})
			.catch((err) =>
			{
				sendError(err, res);
			});
	});
});

router.get('/eventsByType', (req, res) =>
{
	connection((db) =>
	{
		db.collection('events').count({eventCode: req.query.type})
			.then((count) =>
			{
				response.data = count;
				res.json(response);
			})
			.catch((err) =>
			{
				sendError(err, res);
			});
	});
});

router.post('/addEvent', (req, res) =>
{
	let newEvent = createEventFromBody(req.body);
	
	if (newEvent.hasOwnProperty('description') && !newEvent.description)
	{
		delete newEvent.description;
	}
	
	connection((db) =>
	{
		db.collection('events').insertOne(newEvent, (err, dbRes) =>
		{
			if (err)
			{
				sendError(err, res);
			}
			else
			{
				res.json(response);
			}
		});
	});
});

router.post('/updateEvent', (req, res) =>
{
	let newEvent = createEventFromBody(req.body);
	
	let unsetObj = {};
	if (newEvent.hasOwnProperty('description') && !newEvent.description)
	{
		delete newEvent.description;
		unsetObj.description = "";
	}
	
	connection((db) =>
	{
		db.collection('events').updateOne
		(
			{_id: ObjectID(req.body.id)},
			{
				$set: newEvent,
				$unset: unsetObj
			},
			(err, dbRes) =>
			{
				if (err)
				{
					sendError(err, res);
				}
				else
				{
					res.json(response);
				}
			}
		);
	});
});

router.post('/deleteEvent', (req, res) =>
{
	connection((db) =>
	{
		db.collection('events').remove
		(
			{_id: ObjectID(req.body.id)},
			(err, dbRes) =>
			{
				if (err)
				{
					sendError(err, res);
				}
				else
				{
					res.json(response);
				}
			}
		);
	});
});

// Get event types
router.get('/event-types', (req, res) =>
{
	connection((db) =>
	{
		db.collection('eventTypes').find().toArray()
			.then((eventTypes) =>
			{
				response.data = eventTypes;
				res.json(response);
			})
			.catch((err) =>
			{
				sendError(err, res);
			});
	});
});

router.post('/updateEventType', (req, res) =>
{
	if (req.body.iconFileStr)
	{
		const iconFile = path.resolve(__dirname, '../../src/assets/event-type-icons/' + req.body._id + '.svg');
		
		fs.unlink(iconFile, (err) =>
		{
			if (err)
			{
				sendError(err, res);
				return;
			}
			
			fs.writeFile(iconFile, req.body.iconFileStr, (err) =>
			{
				if (err)
				{
					sendError(err, res);
					return;
				}
			});
		});
	}
	
	connection((db) =>
	{
		db.collection('eventTypes').updateOne
		(
			{_id: req.body._id},
			{$set: {name: req.body.name}},
			(err, dbRes) =>
			{
				if (err)
				{
					sendError(err, res);
				}
				else
				{
					res.json(response);
				}
			}
		);
	});
});

router.post('/deleteEventType', (req, res) =>
{
	connection((db) =>
	{
		db.collection('eventTypes').remove
		(
			{_id: ObjectID(req.body._id)},
			(err, dbRes) =>
			{
				if (err)
				{
					sendError(err, res);
				}
				else
				{
					res.json(response);
				}
			}
		);
	});
});

module.exports = router;