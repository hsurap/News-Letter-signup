
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    //the members, status,merge_fields ---comes from mailChimp api
    'members':[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ],
  }
  var jsonData = JSON.stringify(data)

  console.log(firstName, lastName, email);

var jsonData = JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/a7462a45af";

const options = {
  method:"POST",
  auth:"Parush:de8250fac4f19ac7fb1eeeb572e9921d-us5"
}

const request = https.request(url, options, function(response){
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else {
    res.sendFile(__dirname + "/failure.html");
  }

response.on("data",function(data){
  console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();
});

app.post("/failure", function (req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
console.log("Server is running in port 3000")
});
//api key
// de8250fac4f19ac7fb1eeeb572e9921d-us5
  //list id
// a7462a45af
