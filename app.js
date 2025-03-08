const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

   res.sendFile(__dirname + "/index.html");
  
})

app.post("/",function(req,res){
   
    const query=req.body.CityName;
    const apiKey=process.env.API_KEY;
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    https.get(url,function(response){
    console.log("statuscode " + response.statusCode);

    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        console.log(weatherData);
        const temp=weatherData.main.temp;
        console.log(temp);
        const desc=weatherData.weather[0].description;
        console.log(desc);
        const icon=weatherData.weather[0].icon;
        const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        
        res.write("<p style='font-size:40px'> The weather feels like : "+ desc + "</p>");
        res.write("<h1> The temperate is : "+ temp + " degree celsius</h1>");
        res.write("<img src='"+ imageURL + "'></img>")
        res.send();
    })

})
})


app.listen(3001);