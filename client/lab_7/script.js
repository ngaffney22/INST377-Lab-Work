async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint)
  const cities = await request.json()
  //const accessToken = 'pk.eyJ1IjoibmpnYWZmbmV5IiwiYSI6ImNrdXZmaHU0cTY3cDEzMG1hd3ZoN3RkbTAifQ.4SQUMvS57EWb7rrXbrdQPA'
  
  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      // match the results to the search
              
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex)
    });
  
  }
  
  const mymap = L.map('mapid').setView([38.989, -76.93], 11);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibmpnYWZmbmV5IiwiYSI6ImNrdXZmaHU0cTY3cDEzMG1hd3ZoN3RkbTAifQ.4SQUMvS57EWb7rrXbrdQPA'
  
  }).addTo(mymap);
  function centerLeaflet(map, marker) {
    let latLngs = [marker.getLatLng()];
    let markerBounds = L.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
  }
  //centerLeaflet()

  const searchInput = document.querySelector('.input');
  const suggestions = document.querySelector('.suggestions');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });

  let markers = [];
  
  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, cities)
    matchArray.forEach(p => {
      if (p.hasOwnProperty('geocoded_column_1')) {
        const point = p.geocoded_column_1
        const latlog = point.coordinates
        const markers = latlog.reverse()
        markers.push(L.marker(markers).addTo(mymap))
        console.log(markers)
      }
    })
    const html = matchArray.map(place => `
                  <ul>
                  <li><div class="name">${place.name}</div></li>
                  <div class="category">${place.category}</div>
                  <div class="address">${place.address_line_1}</div>
                  <div class="city">${place.city}</div>
                  <div class="zip">${place.zip}</div>
                  </ul>
                  <br>
               `).join('');
    suggestions.innerHTML = html;
  
  }
}
window.onload = windowActions;
  