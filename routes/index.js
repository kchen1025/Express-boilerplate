var express = require('express');
var router = express.Router();

/ GET home page. /
router.get('/', function(req, res) {
    res.json({ title: 'Express' });
});

/ GET Hello World page. /
router.get('/helloworld/:limit', function(req, res) {
    console.log(req.params.limit);
    res.json({ title: 'Hello, World!' });
});

router.post('/adduser', function(req,res){
	res.json({title:req.body.name})
});

module.exports = router;