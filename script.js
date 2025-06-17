const tableBody = document.getElementById("pokedex-body");

async function getPokemonData(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return data;
}

function createTypeLabels(types) {
  return types
    .map(t => `<span class="type type-${t.type.name}">${t.type.name}</span>`)
    .join("");
}

function getStat(pokemon, statName) {
  const stat = pokemon.stats.find(s => s.stat.name === statName);
  return stat ? stat.base_stat : "-";
}

function addPokemonRow(pokemon) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${pokemon.id}</td>
    <td><img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" /></td>
    <td>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</td>
    <td>${createTypeLabels(pokemon.types)}</td>
    <td>${getStat(pokemon, "hp")}</td>
    <td>${getStat(pokemon, "attack")}</td>
    <td>${getStat(pokemon, "defense")}</td>
    <td>${getStat(pokemon, "special-attack")}</td>
    <td>${getStat(pokemon, "special-defense")}</td>
    <td>${getStat(pokemon, "speed")}</td>
  `;

  tableBody.appendChild(row);
}

async function loadAllPokemon(limit = 151) {
  for (let i = 1; i <= limit; i++) {
    try {
      const pokemon = await getPokemonData(i);
      addPokemonRow(pokemon);
    } catch (error) {
      console.error(`Failed to load Pokémon #${i}`, error);
    }
  }
}

loadAllPokemon(); // Load the first 151 Pokémon
