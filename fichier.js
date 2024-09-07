let departureCoords = null;
let arrivalCoords = null;

document.querySelector('#btn').addEventListener('click', function (event) {
    // Empêche le formulaire de se soumettre normalement
    event.preventDefault(); 

    // Récupère la valeur de l'input
    let fromCity = document.querySelector('#departure').value;
    let toCity = document.querySelector('#arrival').value;

    fetchCityData(fromCity, 'departure');
    fetchCityData(toCity, 'arrival');
});

function fetchCityData(city, type) {
    const apiKey = '5b3ce3597851110001cf624824bf8bf1251e4100830d7bd5d588134b';

    // URL pour la recherche géographique
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(city)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Affiche les données dans la console
            console.log('Données:', data);
            
            if (data.features.length > 0) {
                const coords = data.features[0].geometry.coordinates;
                const continent = data.features[0].properties.continent;
                const country = data.features[0].properties.country;

                if (type === 'departure') {
                    departureCoords = coords;
                    document.querySelector('#continent-departure').innerText = continent;
                    document.querySelector('#country-departure').innerText = country;
                    document.querySelector('#long-lat-departure').innerText = coords.join(', ');
                } else {
                    arrivalCoords = coords;
                    document.querySelector('#continent-arrival').innerText = continent;
                    document.querySelector('#country-arrival').innerText = country;
                    document.querySelector('#long-lat-arrival').innerText = coords.join(', ');
                }

                if (departureCoords && arrivalCoords) {
                    calculateRoute(departureCoords, arrivalCoords);
                }
            } else {
                console.log("Aucune donnée trouvée pour", city);
            }
        })
        .catch(e => {
            console.error('Erreur :', e);
        });
}

function calculateRoute(departureCoords, arrivalCoords) {
    const apiKey = '5b3ce3597851110001cf624824bf8bf1251e4100830d7bd5d588134b';

   // https://api.openrouteservice.org/v2/directions/driving-car?api_key=your-api-key&start=8.681495,49.41461&end=8.687872,49.420318
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${departureCoords.join(',')}&end=${arrivalCoords.join(',')}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Données de route:', data);
            
            // Affichage des informations du trajet
            const duration = data.features[0].properties.segments[0].duration/ 2600
            const round = Math.round(duration);
            document.querySelector('#distance').innerHTML = data.features[0].properties.segments[0].distance/ 1000 + "  " +"km" +" "+"/" + "Dans" + "   " + round + "  " +"Hres";


            // Affichage du trajet sur une carte
           displayRouteOnMap(data);
        })
        .catch(e => {
            console.error('Erreur :', e);
        });
}
calculateRoute(departureCoords,arrivalCoords);


function displayRouteOnMap(routeData) {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.Control.geocoder().addTo(map);

    // Ajout du tracé du trajet
    L.geoJSON(routeData, {
        style: function (feature) {
            return { color: '#ff0000', weight: 5 };
        }
    }).addTo(map);
  

    // Zoom sur le trajet
    const bounds = L.geoJSON(routeData).getBounds();
    map.fitBounds(bounds);
}