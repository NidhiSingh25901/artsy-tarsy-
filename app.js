const express = require("express");
const path = require("path");
const app = express(); 
const bodyparser = require('body-parser');
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/contactform', {useNewUrlParser: true, useUnifiedTopology: true });
const port = 8000;


//define mongoose schema
var contactSchema = new mongoose.Schema({
   name: String,
   mail: String,
   subject: String,
   message: String
});

var Contact = mongoose.model('Contact', contactSchema);




// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.pug');
})
app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug');
}) 
app.get('/brand', (req, res)=>{
    const params = {}
    res.status(200).render('brand.pug');
}) 
app.get('/service', (req, res)=>{
    const params = {}
    res.status(200).render('service.pug');
}) 
app.get('/gallery', (req, res)=>{
    const params = {}
    res.status(200).render('gallery.pug');
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug');
}) 


app.post('/contactus', (req, res)=>{
   var myData = new Contact(req.body);
   myData.save().then(()=>{
       res.render('formsubmitted.pug');
       console.log("saved");
   }).catch(()=>{
       res.status(400).send('formfailed.pug');
   });
   // res.status(200).render('contact.pug');
})



//start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});