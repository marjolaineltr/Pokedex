let app = {
    apiBaseUrl: 'https://pokeapi.co/api/v2',
    pokemons: [],
    //On initialise le code du gestionnaire de Pokemons
    init: function() {
        console.log("Script initialisé");

        // On récupère les url des Pokemons
        pokemon.loadPokemonList().then(function() {

        });
    },
};

document.addEventListener('DOMContentLoaded', app.init);