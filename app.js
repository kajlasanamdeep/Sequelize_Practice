const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const routes = require('./routes')

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use('/user',routes.user);
app.use('/admin',routes.admin);

module.exports = app;