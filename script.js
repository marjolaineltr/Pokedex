const poke_container = document.getElementById('poke-container');
const pokemon_count = 150;
const colors = {
    normal: '#F5F5F5',
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
}

const main_types = Object.keys(colors);

async function fetchPokemons() {
    for(let i = 1; i < pokemon_count; i++) {
        await fetchPokemonList(i);
    }
}

async function fetchPokemonList(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    createPokemonCard(data);
}

async function fetchPokemonSpecies(name) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;

    try {
        let response = await fetch(url);
        console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function fetchPokemonTypes(name) {
    const url = `https://pokeapi.co/api/v2/type/${name}`;

    try {
        let response = await fetch(url);
        console.log(response);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const id = pokemon.id.toString().padStart(3, '0');
    pokemonEl.setAttribute('id', id);

    const speciesName = pokemon.species.name;
    const species = await fetchPokemonSpecies(speciesName);
    const name = species.names[4].name;

    const poke_types = pokemon.types.map(type => type.type.name)
    const color = colors[poke_types];
    
    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${poke_types}</span></small>
    </div>`

    pokemonEl.innerHTML = pokemonInnerHTML;

    poke_container.appendChild(pokemonEl);
}

fetchPokemons();