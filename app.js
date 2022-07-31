const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

 app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
  const query = req.body.cityName
  const apikey ="c4d94795d4fb8251b7c3ebc33b1f3474"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid="+apikey+"&units="+unit+"";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"
    res.write("<p> The weather is currently " +weatherDescription + "</p>");
    res.write("<h1>Current temperature in " + query+ " is " +temp+"degree Clecius!</h1>");
      res.write("<img src =" + imageURL + ">");
         res.send();
})
  })
})
//
// //////////////OBJECT////////////
//     // const Person = {
//     //   name: "Hamza",
//     //   age: 22,
//     //   height: 5.11,
//     //   favouriteFood: "rice"
//     // }
//     // console.log(JSON.stringify(Person));



app.listen(3000);
