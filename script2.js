const pokemon_count = 5;

function writeContent(pokemon) {
    console.log(pokemon);
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    // const id = pokemon.id.toString().padStart(3, '0');
    // pokemonEl.setAttribute('id', id);
    // let pokemonInnerHTML = `
    // <div class="img-container">
    //     <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
    // </div>
    // <div class="info">
    //     <span class="number">#${id}</span>
    //     <h3 class="name">${name}</h3>
    //     <small class="type">Type: <span>${typeList}</span></small>
    // </div>`
    // pokemonEl.innerHTML = pokemonInnerHTML;

    // poke_container.appendChild(pokemonEl);
    //On récupère la div où on va ecrire
    // let contentDiv = document.querySelector('#poke-container');
    // //On récupère le LI du template en vue de le cloner puis modifier
    // let templateLi = document.querySelector('.info').content.querySelector('.pokemon-name');
    // //On clone le LI du template pour en avoir un nouveau propre
    // let clonedLi = templateLi.cloneNode(true);
    // clonedLi.textContent = dataToWrite;
    // //On ajoute ce nouveau LI fraichement modifié au DOM
    // contentDiv.appendChild(clonedLi);
}

async function fetchPokemons() {
    for(let i = 1; i < pokemon_count; i++) {
        await getPokemonList(i);
    }
}

async function getPokemonList(id) {

    /**
     * La fonction native fetch() permet de lancer une requête HTTP depuis JS.
     *
     * Dans DevTools > onglet "Network", on pourra voir cette requête avec le
     * filtre "XHR".
     *
     * Arguments de fetch() :
     * 1. l'URL à laquelle on veut accéder
     * 2. les options de cette requête HTTP
     */
    request = fetch('https://pokeapi.co/api/v2/pokemon/');
    // La requête vient d'être envoyée !

    // On n'a pas encore la réponse, mais on se prépare déjà à la recevoir.
    // Une fois la réponse reçue, la fonction de callback précisée en argument
    // sera automatiquement appelée.

    request.then(
        // Cette fonction de callback est définie directement "à la volée" => fonction anonyme.
        // Elle recevra en argument la réponse brute provenant du serveur.
        function (response) {
            // On sait que la réponse est au format JSON (JavaScript Object Notation),
            // donc on transforme la réponse : conversion texte => objet JS
            return response.json();
        }
    )
        
        // On peut enchaîner les fonctions de traitement de la réponse.
        .then(
            // Celle-ci étant chaînée à la précédente, elle recevra en argument la réponse
            // précédemment convertie en objet JS.
            function (jsonResponse) {

                let pokemonList = jsonResponse.results;
                // on parcourt la liste des pokemon 
                pokemonList.forEach(async function(pokemon){
                    
                    console.log(Object.keys(pokemon));
                    let name = pokemon.name
                    getNameInFrench(name)
                });
            }
        );
}

async function getNameInFrench(id) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    const name = data.names[4].name;

    writeContent(name);
}

fetchPokemons();
