const express = require('express');
const router = express.Router();
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
        db.collection('events')
            .find()
            .toArray()
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

module.exports = router;