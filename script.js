const poke_container = document.getElementById('poke-container');
const pokemon_count = 50;
const colors = {
    Normal: '#F5F5F5',
    Feu: '#FDDFDF',
    Plante: '#DEFDE0',
    Électrik: '#FCF7DE',
    Eau: '#DEF3FD',
    Sol: '#f4e7da',
    Roche: '#d5d5d4',
    Fée: '#fceaff',
    Poison: '#98d7a5',
    Insecte: '#f8d5a3',
    Dragon: '#97b3e6',
    Psy: '#eaeda1',
    Vol: '#F5F5F5',
    Combat: '#E6E0D4',
}

const main_types = Object.keys(colors);

async function fetchPokemons() {
    for(let i = 1; i < pokemon_count; i++) {
        await fetchPokemon(i);
    }
}

async function fetchPokemon(id) {
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

    const speciesName = pokemon.species.name;
    const species = await fetchPokemonSpecies(speciesName);
    const name = species.names[4].name;

    const types = pokemon.types;
    console.log(types);

    // if (types.length > 1) {
        types.forEach(async function (type) {
            const typeName = type.type.name;     
            console.log(typeName);  
            const typeNameFr = await fetchPokemonTypes(typeName);
            console.log(typeNameFr);
            return typeName;
        })
    //     const typeNameFr = await fetchPokemonTypes(typeName);
    //     console.log(typeNameFr);
    // } 
    
    // console.log(typeName);
    // const typeNameFr = await fetchPokemonTypes(typeName);
    
    // const types = await fetchPokemonTypes(pokemon.type.id);
    // const type = types.names[3].name
    // const color = colors[type];
    
    // pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span></span></small>
    </div>`

    pokemonEl.innerHTML = pokemonInnerHTML;

    poke_container.appendChild(pokemonEl);
}

fetchPokemons();