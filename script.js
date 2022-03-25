$(document).ready(function(){  

//Code For Making Footer Stay At The Bottom
//   var heightFooter = $(window).height()+42;
 //   $("[data-role=footer]").css("position","absolute");
  // $("[data-role=footer]").css("top",heightFooter);
 // $("[data-role=footer]").css("width","100%");
  //  $("[data-role=footer]").css("overflow","hidden");
//Code For Making Footer Stay At The Bottom

//Code For Repositioning Weather Image Icon
if($(document).width()<=500){
  var divHeight = $("#ITDC").height()/2;
$("#defaultIcon").attr("height",150);
$("#defaultIcon").attr("width",150);
$("#defaultIcon").css("position","relative");
$("#defaultIcon").css("top",divHeight);
if($(document).width()<=350){
  $("#defaultIcon").attr("height",128);
$("#defaultIcon").attr("width",128);
   $("#ITDC").css("border-collapse","collapse");
   //To Fit Long Description On Page
$("#defaultDescription").css("width","80%");

}
}

  var items;
//Setting Up Recent Searches By
//Getting Values From LocalStorage
if(localStorage.name){
  //Test Code
  $("#NoRecent").remove();
  
  items = jQuery.unique((localStorage.name).split(" "));
  
//Test Code
    //Adding Items To The Recent Search List
    if(items.length>10){
     for( var i = items.length-2; i>=items.length-5; i--){
     $("<li><a href='#'>"+items[i]+"</a></li>").appendTo("#search");
} 
    }
    else{
for( var i = items.length-2; i>=0; i--){
     $("<li><a href='#'>"+items[i]+"</a></li>").appendTo("#search");
}     
    }
    
   $("#search").listview('refresh');
 }
//Getting User's Current Information
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition,showError);
  function showPosition(position) {

   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;

//Weather Forecast For User's Current Location
$.getJSON('https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&APPID=5359208f6381ec453990e4747a5c8a1c')
.done(function(data){

   
//Storing All 4 Forecast Icons Values   
var iconValue = data.list[0].weather[0].icon;
var iconValue2 = data.list[1].weather[0].icon;
var iconValue3 = data.list[2].weather[0].icon;
var iconValue4 = data.list[3].weather[0].icon;

//Storing All 4 Forecast Description Values 
var description = data.list[0].weather[0].description;
var description2 = data.list[1].weather[0].description;
var description3 = data.list[2].weather[0].description;
var description4 = data.list[3].weather[0].description;

//Storing All 4 Forecast Temperature Values 
var temp1 = parseInt(data.list[0].main.temp - 273.15)+String.fromCharCode(176)+"C";
var temp2 = parseInt(data.list[1].main.temp - 273.15)+String.fromCharCode(176)+"C";
var temp3 = parseInt(data.list[2].main.temp - 273.15)+String.fromCharCode(176)+"C";
var temp4 = parseInt(data.list[3].main.temp - 273.15)+String.fromCharCode(176)+"C";

//Storing All 4 Forecast Time Values 
var time1=data.list[0].dt_txt;
var time2=data.list[1].dt_txt;
var time3=data.list[2].dt_txt;
var time4=data.list[3].dt_txt;

//Adding All Forecast Values To Table In HTML
$("#description1").text(description);
$("#description2").text(description2);
$("#description3").text(description3);
$("#description4").text(description4);

$("#temp1").text(temp1);
$("#temp2").text(temp2);
$("#temp3").text(temp3);
$("#temp4").text(temp4);

$("#time1").text(time1.substring(11,16));
$("#time2").text(time2.substring(11,16));
$("#time3").text(time3.substring(11,16));
$("#time4").text(time4.substring(11,16));

$("<img>").attr("src","https://openweathermap.org/img/w/"+iconValue+".png").appendTo("#icon1");
$("<img>").attr("src","https://openweathermap.org/img/w/"+iconValue2+".png").appendTo("#icon2");
$("<img>").attr("src","https://openweathermap.org/img/w/"+iconValue3+".png").appendTo("#icon3");
$("<img>").attr("src","https://openweathermap.org/img/w/"+iconValue4+".png").appendTo("#icon4");
})

.fail(function(){
    //Alerting User With No Response From API
    alert("No Response From API");
  }); 		 


//Weather For Current Time
$.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=5359208f6381ec453990e4747a5c8a1c')
.done(function(data){

//Show Humidity Pressure Button
  $("#humPress").css("display","");
  $("#defaultIcon").css("display","");

   //Getting Values From The API For Current Weather Conditions 
   var i = parseInt(data.main.temp - 273.15)+String.fromCharCode(176)+"C";
   $("#humidity").text(data.main.humidity+"%");
   $("#pressure").text((data.main.pressure * 0.1).toFixed(1) +" kPa");
   $("#tempMinMax").text("L : "+(data.main.temp_min- 273.15).toFixed(0)+String.fromCharCode(176)+"C");  
   $("#tempMinMax").append("<br>");
   $("#tempMinMax").append("H : "+(data.main.temp_max- 273.15).toFixed(0)+String.fromCharCode(176)+"C");
   $("#wind").text((data.wind.speed*3.6).toFixed(0)+" km/h");
   var date = new Date(data.sys.sunrise*1000);
   var date1 = new Date(data.sys.sunset*1000);
   //IF Get Minutes Returns between 0-9 then add 0 To starting
   if(date1.getMinutes()<10){
   $("#sunrise").text(date.getHours()+":0"+date.getMinutes());
   }
   else{
       $("#sunrise").text(date.getHours()+":"+date.getMinutes());
   }
if(date1.getMinutes()<10){
   $("#sunset").text(date1.getHours()+":"+"0"+date1.getMinutes());
}
else{
   $("#sunset").text(date1.getHours()+":"+date1.getMinutes());
}
   var iconValue = (data.weather[0].icon).substr(0,2);
    //Adding All The Values To The HTML
    $("#defaultTemperature").text(i);
    $("#defaultIcon").attr("src","icons/"+iconValue+".png");
    $("#defaultCity").text(data.name+","+data.sys.country);
    $("#popName").text(data.name);
    $("#defaultDescription").text(data.weather[0].description);
//Test Code For map
var defCity = $("#defaultCity").text();
if(defCity!=null){
var width = $(document).width()-100;  
//var height = $(document).height()-200; 
$("#Map").remove();
$("#mapFrame").attr("width",width);
$("#mapFrame").attr("height",width);
$("#mapFrame").attr("src","https://www.google.com/maps/embed/v1/place?key=AIzaSyDZZyoyk11flbj-BQhi9A5EUigss0S013I&q="+defCity);
}
//
  })

.fail(function(){
  //Alerting User With No Response From API  
  alert("No Response From API");
}); 

}
}
//Test Code - IP
function showError(){
 $.getJSON("https://ipapi.co/json/",

function (data) {
$("#cityName").val(data.city);
$("#submit").trigger('click');
$("#cityName").val("");
}); 
}
//Test Code - IP

//On Click Of Any City Name
//The City Name Will Be Copied To The Text Box
//And Submit Will Be Triggered
$(document).on("click","li",function(){
	$("#cityName").val($(this).text());
	$("#submit").trigger('click');
});

//On Click Of Submit Button
$( "#target" ).submit(function( event ) {


  var cityName;
  event.preventDefault();
  cityName = $("#cityName").val();
  //Clearing Text Field
  $("#cityName").val("");

cityName = cityName.replace(/\s+/g, '');
//Refreshing The Recent Search List Again From LocalStorage
var items;
//If Local storage is empty then add to it
if(localStorage.name==null){
  //Test Code
  $("#NoRecent").remove();
  //Test Code
  localStorage.name = cityName+" ";
}
//Otherwise append to it
else{
  localStorage.name += cityName+" ";
}
//Removing Everything From Recent Searches
$("#search").empty();
//Test Code
items = jQuery.unique((localStorage.name).split(" "));
//Test Code
//And Adding Everything Back With New Items
if(items.length>10){
  localStorage.name = "";
for( var i = items.length-2; i>=items.length-5; i--){
 $("<li><a href='#'>"+items[i]+"</a></li>").appendTo("#search");
localStorage.name += items[i]+" ";
}  
}
else{
for( var i = items.length-2; i>=0; i--){
 $("<li><a href='#'>"+items[i]+"</a></li>").appendTo("#search");
}
}

//Refreshing The List View
$("#search").listview('refresh');


//Forecast Of Weather For Current Time
//Emptying The Icons For Forecast
$("#icon1").empty();
$("#icon2").empty();
$("#icon3").empty();
$("#icon4").empty();
//Getting Forecast Values For Weather From API For User Requested City
$.getJSON('https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&APPID=5359208f6381ec453990e4747a5c8a1c')
.done(function(data){
  
    //All 4 Icon Values For Custom City
var iconValue = data.list[0].weather[0].icon;
var iconValue2 = data.list[1].weather[0].icon;
var iconValue3 = data.list[2].weather[0].icon;
var iconValue4 = data.list[3].weather[0].icon;

//All 4 Description Values For Custom City
var description = data.list[0].weather[0].description;
var description2 = data.list[1].weather[0].description;
var description3 = data.list[2].weather[0].description;
var description4 = data.list[3].weather[0].description;

//All 4 Temperature Values For Custom City
var temp1 = parseInt(data.list[0].main.temp - 273.15)+String.fromCharCode(176)+"C";
var temp2 = parseInt(data.list[1].main.temp - 273.15)+String.fromCharCode(176)+"C";
var temp3 = parseInt(data.list[2].main.temp - 273.15)+String.fromCharCode(176)+"C";
var temp4 = parseInt(data.list[3].main.temp - 273.15)+String.fromCharCode(176)+"C";

//All 4 Time Values For Custom City
var time1=data.list[0].dt_txt;
var time2=data.list[1].dt_txt;
var time3=data.list[2].dt_txt;
var time4=data.list[3].dt_txt;

//Adding All The Values To The Table In HTML
$("#description1").text(description);
$("#description2").text(description2);
$("#description3").text(description3);
$("#description4").text(description4);

$("#temp1").text(temp1);
$("#temp2").text(temp2);
$("#temp3").text(temp3);
$("#temp4").text(temp4);

$("#time1").text(time1.substring(11,16));
$("#time2").text(time2.substring(11,16));
$("#time3").text(time3.substring(11,16));
$("#time4").text(time4.substring(11,16));

$("<img>").attr("src","https://openweathermap.org/img/w/"+iconValue+".png").appendTo("#icon1");
$("<img>").attr("src","https://openweathermap.org/img/w/"+iconValue2+".png").appendTo("#icon2");
$("<img>").attr("src","https://openweathermap.org/img/w/"+iconValue3+".png").appendTo("#icon3");
$("<img>").attr("src","https://openweathermap.org/img/w/"+iconValue4+".png").appendTo("#icon4");
})

.fail(function(){
 //Alerting User If City Is Not Found
 alert("No Response From API");
});      


//Weather - Current Time For Custom Search
//Getting Values From The API 
$.getJSON('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&APPID=5359208f6381ec453990e4747a5c8a1c')
.done(function(data){

//Show Humidity Pressure Button
  $("#humPress").css("display","");
  $("#defaultIcon").css("display","");

   //Storing The Values And Adding Them To The HTML 
   var country=data.sys.country;
   var i = parseInt(data.main.temp - 273.15) +String.fromCharCode(176)+"C";
   var iconValue = (data.weather[0].icon).substr(0,2);
   $("#humidity").text(data.main.humidity+"%");
   $("#pressure").text((data.main.pressure * 0.1).toFixed(1)+" kPa");
$("#tempMinMax").text("L : "+(data.main.temp_min- 273.15).toFixed(0)+String.fromCharCode(176)+"C");  
   $("#tempMinMax").append("<br>");
   $("#tempMinMax").append("H : "+(data.main.temp_max- 273.15).toFixed(0)+String.fromCharCode(176)+"C");
   $("#wind").text((data.wind.speed*3.6).toFixed(0)+" km/h");
   var date = new Date(data.sys.sunrise*1000);
   var date1 = new Date(data.sys.sunset*1000);
   //IF Get Minutes Returns between 0-9 then add 0 To starting
   if(date.getMinutes()<10){
   $("#sunrise").text(date.getHours()+":0"+date.getMinutes());
   }
   else{
       $("#sunrise").text(date.getHours()+":"+date.getMinutes());
   }
if(date1.getMinutes()<10){
   $("#sunset").text(date1.getHours()+":"+"0"+date1.getMinutes());
}
else{
   $("#sunset").text(date1.getHours()+":"+date1.getMinutes());
}
   $("#defaultTemperature").text(i);
   $("#defaultIcon").attr("src","icons/"+iconValue+".png");
   $("#defaultCity").text(data.name+","+country);
   $("#popName").text(data.name);
   $("#defaultDescription").text(data.weather[0].description);

//Test Code For map
var defCity = $("#defaultCity").text();
if(defCity!=null){
var width = $(document).width()-100;
$("#Map").remove();
$("#mapFrame").attr("width",width);
//earlier height was 400
$("#mapFrame").attr("height",width);
$("#mapFrame").attr("src","https://www.google.com/maps/embed/v1/place?key=AIzaSyDZZyoyk11flbj-BQhi9A5EUigss0S013I&q="+defCity);
}
//

 })

.fail(function(){
    //Alerting User
    alert("No Response From API");
  }); 

});



$(document).on('click','#forecast',function(){
  //Test Code
  //If Device Is Mobile Then Table Border Collapse To Fit
 if($(document).width()<400){
   $("#forecastTable").css("border-collapse","collapse");
 }

  $("#pageoneHeader").addClass("blur-filter");
    $("#pageoneFooter").addClass("blur-filter");
  $("#bimg").addClass("blur-filter"); 
//Test Code
 //On Click Of Forecast Button Open Forecast POPUP
 $("#myPopup").popup("open");

});

$(document).on('click','#chart',function(){
//Test Code
//Messed Up
//$("#popup2").height(404);
if($(document).width() >=1000 ){
  $("#popup2").width(400);
}
else{
  $("#popup2").width($(document).width()-25);

}
//Messed Up
  $("#bimg").addClass("blur-filter"); 
    $("#pageoneFooter").addClass("blur-filter");
  $("#pageoneHeader").addClass("blur-filter"); 
  
  //On Click Of Chart Button Open Chart POPUP 
  $("#popup2").popup("open");

  var ctx = document.getElementById("myChart").getContext('2d');
  var weatherData = new Array();
//Pushing Forecasted Temperature Values To The Graph
weatherData.push(parseInt($("#defaultTemperature").text()));
weatherData.push(parseInt($("#temp1").text()));
weatherData.push(parseInt($("#temp2").text()));
weatherData.push(parseInt($("#temp3").text()));
weatherData.push(parseInt($("#temp4").text()));
console.log(weatherData[0]);
console.log(weatherData[1]);
console.log(weatherData[2]);
console.log(weatherData[3]);
console.log(weatherData[4]);

var myChart = new Chart(ctx, {
  type: 'line',
  data: {
  //Getting Time Values For Chart Labels From HTML    
  labels: ["Current",$("#time1").text(),$("#time2").text(),$("#time3").text(),$("#time4").text()],
  datasets: [{
   label: 'Temperature',
   data: weatherData,
   
   backgroundColor: [
   'rgba(255, 99, 132, 0.2)',
   'rgba(54, 162, 235, 0.2)',
   'rgba(255, 206, 86, 0.2)',
   'rgba(75, 192, 192, 0.2)',
   'rgba(153, 102, 255, 0.2)',
   'rgba(255, 159, 64, 0.2)'
   ],
   borderColor: [
   'rgba(255,99,132,1)',
   'rgba(54, 162, 235, 1)',
   'rgba(255, 206, 86, 1)',
   'rgba(75, 192, 192, 1)',
   'rgba(153, 102, 255, 1)',
   'rgba(255, 159, 64, 1)'
   ],
   borderWidth: 1

 }]
},
options: {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
}
});

});

//Test Code

$("#popup2").on("popupafterclose",function(){

  $("#bimg").removeClass("blur-filter");
  $("#pageoneHeader").removeClass("blur-filter");
  $("#pageoneFooter").removeClass("blur-filter");

});

$("#sideDetails").on("popupafterclose",function(){

  $("#bimg").removeClass("blur-filter");
  $("#pageoneHeader").removeClass("blur-filter");
  $("#pageoneFooter").removeClass("blur-filter");

});

$("#humPress").on("click",function(){

//If Device Is Mobile Then Table Border Collapse To Fit
 if($(document).width()<365){
   $("#detailsTable").css("border-collapse","collapse");
 }

   $("#bimg").addClass("blur-filter"); 
    $("#pageoneFooter").addClass("blur-filter");
  $("#pageoneHeader").addClass("blur-filter"); 
  $("#sideDetails").popup("open");
});


$("#myPopup").on("popupafterclose",function(){

  $("#pageoneHeader").removeClass("blur-filter");
  $("#bimg").removeClass("blur-filter");
  $("#pageoneFooter").removeClass("blur-filter");

});

$("#menuButton").on('click',function(){
  $.mobile.changePage("#menuPage",{ transition: "slidedown", changeHash: false });
});



$("#donatePageButton").on('click',function(){
$.mobile.changePage("#donatePage",{ transition: "slideup", changeHash: false });
});

$("#aboutPageButton").on('click',function(){
$.mobile.changePage("#aboutPage",{ transition: "slideup", changeHash: false });
});

$("#subscribePageButton").on('click',function(){
$.mobile.changePage("#subscribePage",{ transition: "slideup", changeHash: false });
});

$("#creditsPageButton").on('click',function(){
$.mobile.changePage("#creditsPage",{ transition: "slideup", changeHash: false });
});



//Test Code

});