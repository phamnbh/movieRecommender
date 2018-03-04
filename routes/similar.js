var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('similar', {title: "Find by movie"});
});

router.post('/', function(req, res, next) {
	console.log(req.body)
	res.render('similar', {title: "Find by movie", movie: req.body.searchtext})
})

module.exports = router;
