
// Initialize and add the map
function initMap() {
    //map options
   var options ={
    zoom:10,
    center:{lat:53.390044,lng:-2.59695}
   }
   //new map instance
   var map = new google.maps.Map(document.getElementById('map'), options);


   /*This is the code before destructuring

   // add marker ucen
   var marker = new google.maps.Marker({
    position:{lat: 53.466843,lng: -2.234597},
    map:map
   });

   var infoWindow = new google.maps.InfoWindow({
    content:'<h1>UCEN Manchester</h1><br/><p>Openshaw Campus, Ashton Old Rd, Openshaw, Manchester M11 2WH</P>'
   });

   marker.addListener('click', function(){
        infoWindow.open(map, marker);
   });
   */

   /**After destructuring the code is becomes cleaner and easier to understand */
   //calling marker function
   addMarker({coords:{lat:53.466843,lng:-2.234597}, content:'<h1>UCEN Manchester</h1><br/><p>Openshaw Campus, Ashton Old Rd, Openshaw, Manchester M11 2WH</P>'});//UCEN Address

   //add marker function
   function addMarker(props){
    var marker = new google.maps.Marker({
    position:props.coords,
    map:map
   });


   //check marker function called for custom icon (iconImage)
   if(props.iconImage){
    //use iconImage
    marker.setIcon(props.iconImage);
   }

   //check content
   if(props.content){
    var infoWindow = new google.maps.InfoWindow({
    content:props.content
   });

   marker.addListener('click', function(){
        infoWindow.open(map, marker);
   });
   }

   }

}

