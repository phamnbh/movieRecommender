var express = require('express');
var router = express.Router();
var pythonShell = require('python-shell');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	var options = {
		// mode: 'binary',
		// pythonPath: '/home/bobobis/anaconda3/lib/python3.6',
		scriptPath: '/home/bobobis/Documents/GitHub/movieRecommender/python',
		args: ['All']
	};
	pythonShell.run('top.py', options, function(err, results){
		if (err) throw err;
		// console.log(results)
		var movieInfo = []
		for (var i = 0; i < results.length-1; i++) {
			request('http://www.omdbapi.com/?i=tt' + results[i] + '&plot=full&apikey=96b07974', function (error, response, body) {
				if (!error && response.statusCode == 200) {
				    var json = JSON.parse(body);
				    movieInfo.push([json['Title'], json['Poster']]);
				    if (movieInfo.length == 24){
				    	var g = ['All','Action','Adventure','Crime','Drama','Fantasy','Science Fiction','Thriller'];
						res.render('top', {title: "Top Movies", topMovies: movieInfo, genres:g});
				    }
				} else {
				    console.log("There was an error: ") + response.statusCode;
				    console.log(body);
				}
        	});
		}
	})
});

router.get('/:genre', function(req,res,next){
	let genre = req.params.genre

	if (genre == 'All'){
		res.redirect('/top')
	}
	else{
		var options = {
			// mode: 'binary',
			// pythonPath: '/home/bobobis/anaconda3/lib/python3.6',
			scriptPath: '/home/bobobis/Documents/GitHub/movieRecommender/python',
			args: [genre]
		};
		pythonShell.run('top.py', options, function(err, results){
		if (err) throw err;
		// console.log(results)
		var movieInfo = []
		for (var i = 0; i < results.length-1; i++) {
			request('http://www.omdbapi.com/?i=tt' + results[i] + '&plot=full&apikey=96b07974', function (error, response, body) {
				if (!error && response.statusCode == 200) {
				    var json = JSON.parse(body);
				    movieInfo.push([json['Title'], json['Poster']]);
				    if (movieInfo.length == 24){
				    	var g = ['All','Action','Adventure','Crime','Drama','Fantasy','Science Fiction','Thriller'];
						res.render('top', {title: "Top Movies", topMovies: movieInfo, genres:g});
				    }
				} else {
				    console.log("There was an error: ") + response.statusCode;
				    console.log(body);
				}
        	});
		}
	})
	}
})

module.exports = router;
