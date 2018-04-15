const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
    res.render('maintenance.hbs', { });  
});

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile ('server.log', log + '\n', (err) => {
      if (err){
        console.log('Unable to write to log file');
      }
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  //return Date().getFullYear();
  return 'test';
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'About page',
        welcomeMessage: 'Welcome to Node.js!',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req,res) => {
    res.send({
    errorMessage: 'Unable to handle request',
    time: 'now'

  });

});

app.listen(3000, () => {

    console.log(`Listening to port ${port}`)

});