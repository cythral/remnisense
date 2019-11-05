const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
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

const sequelize = new Sequelize
({
    database: 'remnisense_db',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
});

sequelize.authenticate().then(() => console.log('Connection established')).catch(err => console.error('unable to connect to database', err));

const User = sequelize.define('user', 
{
    name: 
    {
        type: Sequelize.STRING,
    },
    password:
    {
        type: Sequelize.STRING,
    },
});

User.sync()
.then(() => console.log('User Table Created Successfully'))
.catch(err => console.log ('Unable to create the user table'));

const createUser = async ({name, password}) => 
{
    return await User.create({name, password});
}

const getAllUsers = async () =>
{
    return await User.findAll();
};

const getUser = async obj =>
{
    return await User.findOne
    (
        {
            where: obj,
        }
    );
};

app.get('/users', function(req, res)
{
    getAllUsers().then(user => res.json(user));
});

app.post('/register', function(req, res, next)
{
    const{name, password} = req.body;
    createUser({name,password}).then(user =>
        res.json({user, msg: 'account created'}));
});
