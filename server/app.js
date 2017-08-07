const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongobudhi:ILoveYou123@cluster0-shard-00-00-frloc.mongodb.net:27017,cluster0-shard-00-01-frloc.mongodb.net:27017,cluster0-shard-00-02-frloc.mongodb.net:27017/dbtodolist?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

let signup = require('./routers/signup');
let signin = require('./routers/signin');
let users = require('./routers/users');
let todos = require('./routers/todos');
let index = require('./routers/index');

app.use('/signup', signup);
app.use('/signin', signin);
app.use('/users', users);
app.use('/todos', todos);
app.use('/', index);

app.listen(process.env.PORT || 3000);
