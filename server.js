const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT ||3000;
//Create app
var app=express();

//set express configurations
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  //Log time
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('unable to append to server log')
    }
  });

  next();
});

//maintenance middleware, no NEXT so nothing beyond this gets executed
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

//configure middleware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

//Set up HTTP route handlers
app.get('/Home',(req,res)=>{
    // response.send('<h1>HelloExpress!</h1>');
    res.render('home.hbs',{
      pageTitle:'home page',
      welcomeMessage:'Howdy'
    });
});

app.get('/about',(req,res)=>{
  res.render('About.hbs',{
    pageTitle:'about page',
  });
});

app.get('/bad',(req,res)=>{
  res.send(
    {
      errorMessage:'Unable to handle request'
    }
  );
});
//Add listener, bind to port on machine
app.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});
