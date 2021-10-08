async function windowActions() {
  const results = [];
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => results.push(...data));
        
  function findMatches(wordToMatch, results) {
    return results.filter(place => {
    // match the results to the search
            
      const regex = new RegExp(wordToMatch, 'gi');
      return place.category.match(regex) || place.name.match(regex)
    });

  }

  const searchInput = document.querySelector('.input');
  const suggestions = document.querySelector('.suggestions');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);

  function displayMatches() {
    const matchArray = findMatches(this.value, results)
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
windowActions()