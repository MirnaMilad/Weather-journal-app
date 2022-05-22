/* Global Variables */
//declare button
const button = document.getElementById("generate");

// declare the key of api from OpenWeatherMap.com
const apiKey = "dfb1a78d090193839f9a7a284a63c46e";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// create an asynchronus function
const callBack = async () => {

//declare the label of zip code to enter the zip code of the area and find its temperature after getting it from OpenWeatherMap.com by api
const zipCode = document.getElementById("zip").value;

// declare the link connects the zip code with the api key , I get the code from OpenWeatherMap.com to return data from the external api
const code =`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`

try{

    const res = await fetch (code)
    // put the response in json code
    const data = await res.json();
    //find the temp from the json code
    const temp = data.main.temp;  
    // declare the label of feelings to use the information written in it to appear in the content 
    const info = document.getElementById("feelings");

    const feelings = info.value;

    // put the instructions in fetch to use the project
await fetch('/entry',{
    method:'post',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          date : newDate , temp:temp , content:feelings
      })
})
const weather = await fetch("/getTemperature",{credentials: 'same-origin'});

const information = await weather.json();

console.log(information);

// return the data to the user 
document.getElementById("temp").innerHTML=`the temperature is ${temp}`;
document.getElementById("date").innerHTML=`the date is ${newDate}`;
document.getElementById("content").innerHTML=`the weather is ${feelings}`;
}


// if any error happened
catch (error){
    console.log("error",error);
}
}
// create an event listener to call the function callBack when the user click on generate
button.addEventListener("click", callBack)

