const APIKEY = 'd347f273fd96dc8cae15dca424ef7c15';
/* appell a l'api openweather avec vill en parametre de fonction*/
let apicall = function(city){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=fr`;

fetch(url).then((response) =>
    response.json().then((data) => {
        console.log(data);
        document.querySelector('#city').innerHTML = "<h2 id='h2prevision'>Ville</h2>" + data.name;
        document.querySelector('#humidity').innerHTML = "<h2 id='h2prevision'>Humidité</h2>" + data.main.humidity+'%';
        document.querySelector('#temperature').innerHTML = "<h2 id='h2prevision'>Température</h2>" + data.main.temp ;
        document.querySelector('#wind').innerHTML = "<h2 id='h2prevision'>Vitesse Du Vent</h2>"  + data.wind.speed + 'km/h';
    })
)
.catch((err) => console.log('Erreur : ' + err));
}

/* ecouteur */
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    let ville = document.querySelector('#input-formulaire').value;

    apicall(ville);

});
/* appel par defaut au chargement de la page*/
apicall('miragoane');



// Votre clé API OpenWeatherMap
const apiKey = 'd347f273fd96dc8cae15dca424ef7c15'; // Remplacez par votre clé API

// Fonction pour obtenir les coordonnées géographiques
function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchWeatherData, handleError);
    } else {
        document.getElementById('weather-info').textContent = 'La géolocalisation n\'est pas supportée par ce navigateur.';
    }
}

// Fonction pour traiter les erreurs de géolocalisation
function handleError(error) {
   /* document.getElementById('weather-info').textContent = 'Erreur de géolocalisation: ' + error.message;*/
}

// Fonction pour récupérer les données météo
function fetchWeatherData(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const cityName = data.name; // Nom de la ville
            document.getElementById('weather-info').textContent = `zone: ${cityName}, Température: ${data.main.temp}°C`;
        })
       /* .catch(error => {
            document.getElementById('weather-info').textContent = 'Erreur lors de l\'appel à l\'API météo: ' + error.message;
        });*/
}

// Appeler la fonction pour obtenir les coordonnées et les données météo
getGeolocation();

// Menu mobile


/*const sideMenu = document.querySelector('menu');
const menuBar = document.querySelector('menu-bar');
const closeBtn = document.querySelector('#close-btn');

menuBar.style.addEventListener('click',()=> {
    sideMenu.style.display = 'block';
});

closeBtn.style.addEventListener('click',()=>{
    sideMenu.style.display = 'none';
});*/

function showMenu(){
    var el = document.getElementById('menu');
    if(document.getElementById('menu').style.display == 'block'){
        el.style.display = 'none';
    }else{
        el.style.display = 'block';
    }
}


