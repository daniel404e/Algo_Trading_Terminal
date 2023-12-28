/* eslint-disable */
 
const express = require("express");
const axios = require("axios");
var cors = require('cors')
var mongoose = require('mongoose');
 

var app = express();
app.use(cors())
var tosend;


//////////////////////////////////////////////////////////////////////////
var data1;
var mongoDB = 'mongodb+srv://joshuau:Joshua12345@cluster0.rtcoedt.mongodb.net/?retryWrites=true&w=majority/users';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

 


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
 



const UserSchema = new mongoose.Schema({
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  const Spotlightschema = new mongoose.Schema({
    content: {
      type: String,
       
    } ,
  });

  const usermodel = mongoose.model("User", UserSchema);

  const spotlightmodel = mongoose.model("Spotlight", Spotlightschema);



 

/////////////////////////////////////////////////////////////////////////////////////////////////
 


app.get("/auth/:uname/password/:password",function(request,response,next){


           var docs 
           var tocheckuname = request.params.uname;
           var tocheckpassword = request.params.password;
           var ifauthenticated =0;
           
             
  usermodel.find({user_name: tocheckuname}, function (err, docs) {
    if (err){
        console.log(err);
        data1 = err;
    }
    else{
        
        if(docs[0])
        {
        if(docs[0].password == tocheckpassword )
        {
          ifauthenticated=1;  
        }
        else
        {
          console.log("wrong password")
          ifauthenticated = -2;
        }
      }
      else
      {
        console.log("username not registered")
        ifauthenticated = -1;
      }

    data1=docs;
    }

    response.send(String(ifauthenticated));
});



  
   
})

app.get("/spotlight",function(request,response){


 
 
  
    
  spotlightmodel.find({}, function (err, doc2) {
if (err){
console.log(err);
 
}
else{
 
}
console.log(doc2);
response.send( doc2[0].content );
});





})






app.get("/:index",function(request,response,next){

  var indexs = request.params.index; 
  console.log(indexs)
    axios.get("https://www.nseindia.com/api/option-chain-indices?symbol="+indexs).then(resp => {

  tosend = resp.data;


    
      
}).catch((err)=>{ })

    response.send(tosend);
    response.json({msg: 'This is CORS-enabled for all origins!'})
})


 

app.listen(4100,function() { console.log("port established");});