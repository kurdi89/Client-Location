let userLocation = {};
let phone = document.getElementById('phone');
let update = document.getElementById('update');

axios.get('http://localhost:3000/api/v1/users').then(data => {
    console.log(data)
})

const updateLocation = async (location) =>{
    console.log("location is : ", location)
    await axios.put('http://localhost:3000/api/v1/users/updateLocation', {
        phone : "05" + phone.value.trim(),
        location : location,
        locationLastUpdate : Date.now()
    })
}




function sendLocation() {

    
    // navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
}

update.addEventListener('click', async (e)=>{

    e.preventDefault();

    if(!phone.value || phone.value == ""){
        alert('Please enter your phone number')
    }else{
        await navigator.geolocation.getCurrentPosition(async function(position) {
            let latitude = await position.coords.latitude;
            let longitude = await position.coords.longitude;
            let accuracy = await position.coords.accuracy;
            let altitude = await position.coords.altitude;
            let speed = await position.coords.speed;
            let heading = await position.coords.heading;
            let altitudeAccuracy = await position.coords.altitudeAccuracy;
            let location = await {latitude , longitude, accuracy, speed, heading, altitude, altitudeAccuracy}

            // send a request to the backend : 
            await updateLocation(location)

            // add a marker :
            var marker = new mapboxgl.Marker()
                        .setLngLat([longitude, latitude])
                        .addTo(map); // add the marker to the map
            // fly to :
            map.flyTo({
                center: [longitude, latitude],
                zoom: 12,
                speed: 4,
                curve: 1,
                easing(t) {
                    return t;
                }
            });

        });
    }
})


// MapBox :

mapboxgl.accessToken = 'pk.eyJ1Ijoia3VyZGk4OSIsImEiOiJjazJlOTFpeTAwNmRzM2VzNWY5ODFoc2YyIn0.6Tf17x0mxQvbhLSYEzYg_A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [46.738586, 24.774265], // starting position [lng, lat]
    zoom: 4 // starting zoom
});