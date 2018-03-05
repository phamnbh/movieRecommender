var express = require('express');
var router = express.Router();
var pythonShell = require('python-shell');
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('similar', {title: "Find by movie"});
});

router.post('/', function(req, res, next) {
	var options = {
		// mode: 'binary',
		// pythonPath: '/home/bobobis/anaconda3/lib/python3.6',
		scriptPath: '/home/bobobis/Documents/GitHub/movieRecommender/python',
		args:[req.body.searchtext]
	};

	pythonShell.run('recByKeywords.py', options, function(err, results){
		if (err) throw err;
		var movieInfo = []
		for (var i = 0; i < results.length-1; i++) {
			request('http://www.omdbapi.com/?i=tt' + results[i] + '&plot=full&apikey=96b07974', function (error, response, body) {
				if (!error && response.statusCode == 200) {
				    var json = JSON.parse(body);
				    movieInfo.push([json['Title'], json['Poster']]);
				    if (movieInfo.length == 4){
				    	console.log(movieInfo)
						res.render('similar', {title: "Find by movie", movie: req.body.searchtext, recommendations:movieInfo});
				    }
				} else {
				    console.log("There was an error: ") + response.statusCode;
				    console.log(body);
				}
        	});
		}
	})

	// pythonShell.run('recByKeywords.py', options, function(err, results){
	// 	if (err) throw err;
	// 	res.render('similar', {title: "Find by movie", movie: req.body.searchtext, recommendations: results});

	// })
})

module.exports = router;
