const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID; 

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

router.post('/addEvent', (req, res) =>
{
	let newEvent =
	{
		name: req.body.name,
		eventCode: req.body.eventCode,
		date: new Date(req.body.date)
	}
	if (req.body.description)
	{
		newEvent.description = req.body.description;
	}
	
	connection((db) =>
	{
		db.collection('events').insertOne(newEvent, (err, res) =>
		{
			if (err)
			{
				sendError(err, res);
			}
		});
	});
	
	res.json(response);
});

router.post('/updateEvent', (req, res) =>
{
	let newEvent =
	{
		name: req.body.name,
		eventCode: req.body.eventCode,
		date: new Date(req.body.date)
	}
	if (req.body.description)
	{
		newEvent.description = req.body.description;
	}
	
	connection((db) =>
	{
		db.collection('events').updateOne
		(
			{_id: ObjectID(req.body.id)},
			{$set: newEvent},
			(err, res) =>
			{
				if (err)
				{
					sendError(err, res);
				}
			}
		);
	});
	
	res.json(response);
});

router.post('/deleteEvent', (req, res) =>
{
	connection((db) =>
	{
		db.collection('events').remove
		(
			{_id: ObjectID(req.body.id)},
			(err, res) =>
			{
				if (err)
				{
					sendError(err, res);
				}
			}
		);
	});
	
	res.json(response);
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

module.exports = router;