
let departureCoords = null;
let arrivalCoords = null;
document.querySelector('#btn').addEventListener('click', function (event) {
    // Empêche le formulaire de se soumettre normalement
    event.preventDefault();
    
    // Récupère la valeur de l'input
    let vill = document.querySelector('#departure').value;
    
    const apical = function(vill) {
        // Remplacez 'your_api_key' par votre clé API réelle
        const apiKey = '5b3ce3597851110001cf624824bf8bf1251e4100830d7bd5d588134b';
        // URL pour la recherche géographique
        const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(vill)}`;

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
                // Assure que les données existent avant de les utiliser
                if (data.features.length > 0) {
                    departureCoords = data.features[0].geometry.coordinates;
                    document.querySelector('#continent-departure').innerHTML = data.features[0].properties.continent;
                    document.querySelector('#country-departure').innerHTML = data.features[0].properties.country;
                    document.querySelector('#long-lat-departure').innerHTML = data.features[0].geometry.coordinates;
                } else {
                    document.querySelector('#continent-departure').innerHTML = "Aucune donnée trouvée";
                    document.querySelector('#country-departure').innerHTML = "Aucune donnée trouvée";
                    document.querySelector('#long-lat-departure').innerHTML = "Aucune donnée trouvée";
                
                }
            })
            .catch(err => {
                console.error('Erreur : ' + err);
            });
    };

    // Appel de la fonction avec la valeur de l'input
    apical(vill);
});
document.querySelector('#btn').addEventListener('click', function (event) {
    // Empêche le formulaire de se soumettre normalement
    event.preventDefault();
    
    // Récupère la valeur de l'input
    let vil = document.querySelector('#arrival').value;
    
    const apicall = function(vil) {
        // Remplacez 'your_api_key' par votre clé API réelle
        const apiKey = '5b3ce3597851110001cf624824bf8bf1251e4100830d7bd5d588134b';
        // URL pour la recherche géographique
        const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(vil)}`;

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
                // Assure que les données existent avant de les utiliser
                if (data.features.length > 0) {
                    arrivalCoords = data.features[0].geometry.coordinates;
                    document.querySelector('#continent-arrival').innerHTML = data.features[0].properties.continent;
                    document.querySelector('#country-arrival').innerHTML = data.features[0].properties.country;
                    document.querySelector('#long-lat-arrival').innerHTML = data.features[0].geometry.coordinates;
                } else {
                    document.querySelector('#continent-arrival').innerHTML = "Aucune donnée trouvée";
                    document.querySelector('#country-arrival').innerHTML = "Aucune donnée trouvée";
                    document.querySelector('#long-lat-arrival').innerHTML = "Aucune donnée trouvée";
                }
            })
            .catch(err => {
                console.error('Erreur : ' + err);
            });
    };

    // Appel de la fonction avec la valeur de l'input
    apicall(vil);
   
});




//2eme requete

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
        document.querySelector('#distance').innerHTML = data.features[0].properties.segments[0].distance;
        document.querySelector('#duration').innerHTML = data.features[0].properties.segments[0].duration;

            // Affichage du trajet sur une carte
            displayRouteOnMap(data);
        })
        .catch(err => {
            console.error('Erreur : ' + err);
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
