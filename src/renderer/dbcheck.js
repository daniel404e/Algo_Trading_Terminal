/* eslint-disable */

var mongoose = require('mongoose');

 




  export default function checkforusername()
{

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

  const usermodel = mongoose.model("User", UserSchema);



  



  usermodel.find({user_name: 'addmin'}, function (err, docs) {
    if (err){
        console.log(err);
        data1 = err;
    }
    else{
        console.log("First function call : ", docs);
    data1=docs;
    }

    
});



return("soip"+data1)


}