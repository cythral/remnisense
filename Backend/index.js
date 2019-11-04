const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.get('/',function(req, res)
{
    res.json({message: 'App is running'});
});

app.listen(3000, function()
{
    console.log('Running on port 3000');
});
