var card =  {
    countPokemons: function() {
        for(let i = 1; i < app.pokemonCount; i++) {
            fetchPokemonList(i);
        }
    }
}