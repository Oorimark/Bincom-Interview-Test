const express = require('express');
const routes = require('./api/routes')

const app = express()
app.set('view engine', 'ejs')
app.set('views','./views');

app.use('/',routes)
app.use('/css', express.static(__dirname + '/public/css')); 
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));



app.listen(7000, (e) => {console.log("server connected")})