const themeToggle = document.getElementById('theme-toggle');
const searchBar = document.getElementById('search-bar');
const filters = document.querySelectorAll('.filter-btn');
const pokedexContainer = document.getElementById('pokedex-container');
const pokemonModal = document.getElementById('pokemon-modal');
const closeModal = document.getElementById('close-modal');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonDescription = document.getElementById('pokemon-description');
const pokemonStats = document.getElementById('pokemon-stats');
const pokemonAbilities = document.getElementById('pokemon-abilities');
const pokemonEvolution = document.getElementById('pokemon-evolution');

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

const openPokemonModal = async (pokemon) => {
  const res = await fetch(pokemon.species.url);
  const speciesData = await res.json();
  const evolutionChainUrl = speciesData.evolution_chain.url;
  const evoRes = await fetch(evolutionChainUrl);
  const evoData = await evoRes.json();

  pokemonName.textContent = pokemon.name;
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonDescription.textContent = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
  pokemonStats.innerHTML = `
    <li>HP: ${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</li>
    <li>Attack: ${pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</li>
    <li>Defense: ${pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</li>
    <li>Speed: ${pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}</li>
  `;
  pokemonAbilities.innerHTML = pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('');
  pokemonEvolution.textContent = `Evolves from ${evoData.chain.species.name}`;
  pokemonModal.style.display = 'block';
};

const closePokemonModal = () => {
  pokemonModal.style.display = 'none';
};

const toggleTheme = () => {
  const currentTheme = document.body.getAttribute('data-theme');
  document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
};

const filterPokemonByCategory = (category) => {
  // Implement filtering logic based on category
  // For example:
  // if (category === 'starter') {
  //   filteredPokemon = allPokemon.filter(pokemon => pokemon.isStarter);
  // }
  renderPokemonCards(filteredPokemon);
};

const searchPokemon = () => {
  const query = searchBar.value.toLowerCase();
  filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(query));
  render
::contentReference[oaicite:10]{index=10}
 
