const themeToggle = document.getElementById('theme-toggle');
const searchBar = document.getElementById('search-bar');
const filters = document.querySelectorAll('.filter-btn');
const pokedexContainer = document.getElementById('pokedex-container');
const pokemonModal = document.getElementById('pokemon-modal');
const closeModal = document.getElementById('close-modal');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonDescription = document.getElementById('pokemon-description');

let allPokemon = [];
let filteredPokemon = [];

const fetchPokemonData = async () => {
  for (let i = 1; i <= 151; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();
    allPokemon.push(data);
  }
  filteredPokemon = [...allPokemon];
  renderPokemonCards(filteredPokemon);
};

const renderPokemonCards = (pokemonList) => {
  pokedexContainer.innerHTML = '';
  pokemonList.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <h3>${pokemon.name}</h3>
      <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
      <p>HP: ${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
    `;
    card.addEventListener('click', () => openPokemonModal(pokemon));
    pokedexContainer.appendChild(card);
  });
};

const openPokemonModal = (pokemon) => {
  pokemonName.textContent = pokemon.name;
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonDescription.textContent = `Height: ${pokemon.height}, Weight: ${pokemon.weight}`;
  pokemonModal.style.display = 'block';
};

const closePokemonModal = () => {
  pokemonModal.style.display = 'none';
};

const toggleTheme = () => {
  const currentTheme = document.body.getAttribute('data-theme');
  document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
};

const filterPokemonByType = (type) => {
  if (type === 'all') {
    filteredPokemon = [...allPokemon];
  } else {
    filteredPokemon = allPokemon.filter(pokemon => pokemon.types.some(t => t.type.name === type));
  }
  renderPokemonCards(filteredPokemon);
};

const searchPokemon = () => {
  const query = searchBar.value.toLowerCase();
  filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(query));
  renderPokemonCards(filteredPokemon);
};

themeToggle.addEventListener('click', toggleTheme);
searchBar.addEventListener('input', searchPokemon);
filters.forEach(filter => {
  filter.addEventListener('click', () => filterPokemonByType(filter.dataset.type));
});
closeModal.addEventListener('click', closePokemonModal);

fetchPokemonData();
