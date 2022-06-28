var pokemon = {
    // Fonction permettant de récupérer les pokemon depuis une API
    loadPokemonList: function(){
        // On prépare la configuration de la requête HTTP
        var myInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        return fetch(app.apiBaseUrl + '/pokemon' , myInit)
        // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
        // On convertit cette réponse en un objet JS et on le retourne
            return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(jsonResponse) {
            // On dispose désormais d'un tableau JS exploitable dans la variable jsonResponse
            //On créé un nouveau tableau vide qu'on va remplir
            console.log(jsonResponse);
            let pokemonList = jsonResponse.results;
            let pokemonCount = jsonResponse.count;
            console.log(pokemonList);
            let cleanPokemonObject = {};
            for(let i = 1; i < pokemonCount; i++) {
                //Pour chaque pokemon
                pokemonList.forEach(function (Pokemon, key) {
                    cleanPokemonObject[key] = Pokemon.url;
                });
            }
            console.log(cleanPokemonObject);
            // On choisi de stocker les pokemon dans le tableau app.pokemonUrlList pour plus tard
            let pokemonUrlList = cleanPokemonObject;

            Object.keys(pokemonUrlList).forEach(function (key, id) {
                if(key > 0) {
                    pokemon.loadPokemon(id);
                    pokemon.loadPokemonSpecies(id);
                }
            });
        });
    },
    // Fonction permettant de récupérer les pokemon depuis une API
    loadPokemon: function(id){
        // On prépare la configuration de la requête HTTP
        var myInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        return fetch(app.apiBaseUrl + `/pokemon/${id}` , myInit)
        // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
        // On convertit cette réponse en un objet JS et on le retourne
            return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(jsonResponse) {
            // On dispose désormais d'un tableau JS exploitable dans la variable jsonResponse
            //On créé un nouveau tableau vide qu'on va remplir
            let pokemonTypes = jsonResponse.types;
            // On choisi de stocker les pokemon dans le tableau app.pokemons pour plus tard
            let cleanPokemonTypeObject = {};
            pokemonTypes.forEach(function(type, key) {
                cleanPokemonTypeObject[key] = type.type.name;
            });
            Object.values(cleanPokemonTypeObject).forEach(function(type) {
                pokemon.loadPokemonTypes(type);
            });
        });
    },
    // Fonction permettant de récupérer les noms Français des pokemon depuis une API
    loadPokemonSpecies: function(id){
        // On prépare la configuration de la requête HTTP
        var myInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        return fetch(app.apiBaseUrl + `/pokemon-species/${id}` , myInit)
        // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
        // On convertit cette réponse en un objet JS et on le retourne
            return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(jsonResponse) {
            app.pokemonName = jsonResponse.names[4].name;
            console.log(app.pokemonName);
        });
    },
    // Fonction permettant de récupérer les type Français des pokemon depuis une API
    loadPokemonTypes: function(type){
        // On prépare la configuration de la requête HTTP
        var myInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };

        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        return fetch(app.apiBaseUrl + `/type/${type}` , myInit)
        // Ensuite, lorsqu'on reçoit la réponse au format JSON
        .then(function(response) {
        // On convertit cette réponse en un objet JS et on le retourne
            return response.json();
        })
        // Ce résultat au format JS est récupéré en argument ici-même
        .then(function(jsonResponse) {
            app.pokemonType = jsonResponse.names[3].name
            console.log(app.pokemonType);
        });
    }
}