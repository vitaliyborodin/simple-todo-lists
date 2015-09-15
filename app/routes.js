var Todo           = require('../app/models/todo.js');

module.exports = function(app) {
    
    // get all lists
    app.get('/api/lists', function(req, res) {
    	Todo.find({user :'test'}, function(err, lists) {
    		if (err)
    			res.send(err)

    		res.json(lists);
    	});
    });

    // create list
    app.post('/api/lists', function(req, res) {
    	Todo.create({
    		priority : 1,
    		user : 'test',
    		date: new Date(),
    		name: '' + new Date(),
    		tasks: []
    	}, function(err, list) {
    		if (err)
    			res.send(err);

    		Todo.find({user :'test'}, function(err, lists) {
    			if (err)
    				res.send(err)
    			res.json(lists);
    		});
    	});

    });

    // delete a list
    app.delete('/api/lists/:list_id', function(req, res) {
    	Todo.remove({
    		_id : req.params.list_id
    	}, function(err, list) {
    		if (err)
    			res.send(err);

    		Todo.find({user :'test'}, function(err, lists) {
    			if (err)
    				res.send(err)
    			res.json(lists);
    		});
    	});
    });

    app.post('/api/lists/:list_id', function(req, res) {
        Todo.update({_id : req.params.list_id}, {
                $set: { 'name': req.param('name')}
            }, function(err, list) {
                if (err)
                    res.send(err);

            // get and return all the lists after you create another
            Todo.find({user :'test'}, function(err, lists) {
                if (err)
                    res.send(err)
                res.json(lists);
	  		});
	  	});
    });

    // delete a task
    app.delete('/api/lists/:list_id/:task_id', function(req, res) {
    	Todo.update({
    		_id : req.params.list_id}, {
    			$pull: { tasks: { _id : req.params.task_id }} 
    		}, function(err, list) {
    			if (err)
    				res.send(err);

    			Todo.find({user :'test'}, function(err, lists) {
    				if (err)
    					res.send(err)
    				res.json(lists);
    			});
    		});
    });

    // create a task
    app.post('/api/lists/:list_id/:task_text', function(req, res) {
    	Todo.update({
    		_id : req.params.list_id}, {
    			$push: { tasks: { 
    				priority : 1,
    				date: new Date(),
    				text: req.params.task_text,
    				done: false
    			}} 
    		}, function(err, list) {
    			if (err)
    				res.send(err);

    			Todo.find({user :'test'}, function(err, lists) {
    				if (err)
    					res.send(err)
    				res.json(lists);
    			});
    		});
    });

    app.post('/api/tasks/:task_id', function(req, res) {
        Todo.update({ tasks: { $elemMatch: {_id : req.params.task_id}}}, {
                $set: { 'tasks.$.done': req.param('done')}
            }, function(err, list) {
                if (err)
                    res.send(err);

            // get and return all the lists after you create another
            Todo.find({user :'test'}, function(err, lists) {
                if (err)
                    res.send(err)
                res.json(lists);
	  		});
	  	});
    });

    app.put('/api/tasks/:task_id', function(req, res) {
        Todo.update({ tasks: { $elemMatch: {_id : req.params.task_id}}}, {
                $set: { 'tasks.$.text': req.param('text')}
            }, function(err, list) {
                if (err)
                    res.send(err);

            // get and return all the lists after you create another
            Todo.find({user :'test'}, function(err, lists) {
                if (err)
                    res.send(err)
                res.json(lists);
	  		});
	  	});
    });

    // application
    app.get('*', function(req, res) {
    	res.sendfile('./public/index.html');
    });

}