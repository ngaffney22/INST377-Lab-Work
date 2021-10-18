async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  
  const request = await fetch(endpoint)
  const cities = await request.json()
  
  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex)
    });

  } 
  /* inputbox.addEventListener('input', (event)) => {
    console.log(event.target.value);
    const filteredList = cities.filter(item, index) => {
      const zipcode = event.target.value;
      return item.zip === zipcode;
    }
  } */
  
  let mymap = L.map('mapid').setView([38.989, -76.93], 11);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibmpnYWZmbmV5IiwiYSI6ImNrdXZmaHU0cTY3cDEzMG1hd3ZoN3RkbTAifQ.4SQUMvS57EWb7rrXbrdQPA'
  
  }).addTo(mymap);

  
 
  //let markers = [];
  
  function displayMatches(evt) {
    console.log(evt.target.value);
    const matchArray = findMatches(evt.target.value, cities)
    const limitedList = matchArray.slice(0, 5);
    limitedList.forEach(p => {
      if (p.hasOwnProperty('geocoded_column_1')) {
        const point = p.geocoded_column_1
        const latlog = point.coordinates
        const markers = latlog.reverse()
        L.marker(markers).addTo(mymap)
        console.log(markers)
      }
      
    })
    const html = limitedList.map(place => `
                  <ul class = "food-place">
                  <li><div class="name">${place.name}</div></li>
                  <div class="address">${place.address_line_1}</div>
                  </ul>
                  <br>
               `).join('');
    suggestions.innerHTML = html;
  
  }
  const searchInput = document.querySelector('.input');
  const suggestions = document.querySelector('.suggestions');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {displayMatches(evt)})
  // document.querySelector('button').addEventListener('click', (evt) => { displayMatches(evt) });
}

window.onload = windowActions;
  