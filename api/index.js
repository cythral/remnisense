const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const promisify = require("util").promisify;
const sleep = promisify(setTimeout);
const app = express();

const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_PATH || "/";
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

let strategy = new JwtStrategy(jwtOptions, 
    async function(jwt_payload, next)
    {
        console.log('payload received', jwt_payload);
        let user = await getUser({id: jwt_payload.id});
        if (user)
        {
            next(null, user);
        } else 
        {
            next(null,false);
        }

    }
);

passport.use(strategy);

function route(method, path, handler, authenticate = false) 
{
    let fullPath = BASE_PATH + path.trimEnd("/");
    fullPath = fullPath === "" ? "/" : fullPath;

    return authenticate ?
        app[method](fullPath, passport.authenticate('jwt', { session: false }), handler) :
        app[method](fullPath, handler);
}

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

var User;

const sequelize = new Sequelize
({
    host: DB_HOST,
    database: DB_NAME,
    username:  DB_USER,
    password: DB_PASSWORD,
    dialect: 'mysql',
    dialectOptions: {
        connectTimeout: 60000
    }
});

User = sequelize.define('user', 
{
    name: Sequelize.STRING,
    password: Sequelize.STRING
});

Sets = sequelize.define('set',
{
    user_id: Sequelize.INTEGER,
    name: Sequelize.STRING
});

Cards = sequelize.define('set',
{
    name: Sequelize.STRING,
    value: Sequelize.STRING,
});
UserTokens = sequelize.define('usertokens',
{
    token: Sequelize.STRING
});

UserTokens.belongsTo(User);
User.hasMany(UserTokens);
User.hasMany(Sets);
Cards.belongsTo(Sets);
Sets.hasMany(Cards);
Sets.belongsTo(User);

async function sync() 
{
    try
    {
        await sequelize.authenticate();
        await User.sync();
        await Sets.sync();
        await Cards.sync();
        await UserTokens.sync();
        console.log("Succesfully created the users table");
    } 
    catch(error) 
    {
        console.error("An error occurred trying to create the users table: ", error);
        await sleep(1000);
        await sync();
    }
}

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

route("get", "/", function(req, res)
{
    res.json({message: 'App is running'});
});

route("get", "/users", function(req, res)
{
    getAllUsers().then(user => res.json(user));
});

route("get", "/users/:user/sets", async function(req, res)
{
    const user_id = req.params.user === "me" ? req.user.id : req.params.user;
    const results = await Sets.findAll
    ({
        where: {
            user_id
        }
    });

    return res.json(results);
}, true);

route("post", "/users/:user/sets", async function(req, res)
{
    if(req.params.user !== "me") {
        res.status(500).end();
    }

    const payload = req.body;
    payload.user_id = req.user.id;

    try 
    {
        let response = await Sets.create(payload);
        payload.id = response.id;

        res.status(200).json(payload);
    } 
    catch(error) 
    {
        console.error(error);
        json.status(500).end();
    }
}, true);

route("patch", "/users/:user/sets/:set", async function(req, res)
{
    if(req.params.user !== "me") {
        res.status(500).end();
    }

    const payload = req.body;
    payload.user_id = req.user.id;

    try 
    {
        await Sets.update
        (
            payload,
            {
                where: {
                    user_id: payload.user_id,
                    id: payload.id
                }
            }
        );

        res.status(200).json(payload);
    } 
    catch(error) 
    {
        console.error(error);
        res.status(500).end();
    }
}, true);

route("delete", "/users/:user/sets/:set", async function(req, res)
{
    if(req.params.user !== "me") {
        res.status(500).end();
    }

    try
    {
        await Sets.destroy
        ({
            where: {
                id: req.params.set
            }
        });

        res.status(200).end();
    }
    catch(error)
    {
        console.error(error);
        res.status(500).end();
    }
}, true);

route("get", "/users/:user/sets/set:/cards", async function(req, res)
{
    const user_id = req.params.user === "me" ? req.user.id : req.params.user;
    const set_id = req.params.set === "" ? req.set.id : req.params.set;
    const results = await Cards.findAll
    ({
        where: {
            user_id,
            set_id
        }
    });

    return res.json(results);
}, true);

route("post", "/users/:user/sets/:set/cards", async function(req, res)
{
    if(req.params.user !== "me") {
        res.status(500).end();
    }

    const payload = req.body;
    payload.user_id = req.user.id;

    try 
    {
        let response = await Cards.create(payload);
        payload.id = response.id;
        res.status(200).json(payload);
    } 
    catch(error) 
    {
        console.error(error);
        json.status(500).end();
    }
}, true);

route("delete", "/users/:user/sets/:set/cards/:card", async function(req, res)
{
    if(req.params.user !== "me") {
        res.status(500).end();
    }

    try
    {
        await Cards.destroy
        ({
            where: {
                id: req.params.cards
            }
        });

        res.status(200).end();
    }
    catch(error)
    {
        console.error(error);
        res.status(500).end();
    }
}, true);

route("patch", "/users/:user/sets/:set", async function(req, res)
{
    if(req.params.user !== "me") {
        res.status(500).end();
    }

    const payload = req.body;
    payload.user_id = req.user.id;

    try 
    {
        await Cards.update
        (
            payload,
            {
                where: {
                    user_id: payload.user_id,
                    id: payload.id
                }
            }
        );

        res.status(200).json(payload);
    } 
    catch(error) 
    {
        console.error(error);
        res.status(500).end();
    }
}, true);

route("post", "/register", function(req, res)
{
    const{name, password} = req.body;
    createUser({name,password}).then(user =>
        res.json({user, msg: 'account created'}));
});

route("post","/login", async function(req, res) 
{
    try
    {
        const {name, password} = req.body;
        
        if (name && password) 
        {
            let user = await getUser({ name });
            console.log(user);  
            if (!user) 
            {
                res.status(401).json({ msg: "No such user found", user}).end();
            }
            if (user.password === password) 
            {
                let payload = { id: user.id };
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({ msg: "ok", token: token }).end();
            } 
            else 
            {
                res.status(401).json({ msg: "Password is incorrect" }).end();
            }
        }
        else
        {
            res.status(400).end();
        }
    } 
    catch(error) 
    {
        console.error(error);
        res.status(500).end();
    }
});

route("post", "/logout", async function(req, res)
{
    // todo: invalidate tokens
    if(req.params.user !== "me") {
        res.status(500).end();
    }
    try
    {
        await UserTokens.destroy
        ({
            where: {
                id: req.params.usertoken
            }
        });
        res.status(200).end();
    }
    catch(error)
    {
        console.error(error);
        res.status(500).end();
    }
}, true);

void async function() 
{
    await sync();
    
    app.listen(PORT, function()
    {
        console.log('Running on port 3000');
    });
}();