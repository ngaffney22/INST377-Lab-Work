async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  
    
  const request = await fetch(endpoint)
  const arrayName = await request.json()
  
  function findMatches(wordToMatch, arrayName) {
    return arrayName.filter(place => {
      // match the results to the search
              
      const regex = new RegExp(wordToMatch, 'gi');
      return place.category.match(regex) || place.name.match(regex)
    });
  
  }
  
  const searchInput = document.querySelector('.input');
  const suggestions = document.querySelector('.suggestions');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });
  
  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, arrayName)
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
  