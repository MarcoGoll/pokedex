/**
* Initialises the opening of the detail page for a specific Pokemon
* @param {number} id - ID of the Pokemon for which the detailview should be displayed
*/
async function openDetailDialog(id) {
    await loadNextPokemon(id);
    toggleClass('d_none', 'detailView');
    toggleClass('overflowHidden', 'body');

}

/**
* Plays the sound of a Pokemon
* @param {number} id - ID of the Pokemon for which the sound should be played
*/
function playCrie(id) {
    let crie = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`);
    crie.volume = 0.01;
    crie.play();
}

/**
* Renders the Detailview of a Pokemon
* @param {object} pokemon - Pokemon object for which the view should be rendered
* @param {object} pokemonSpecies - Species object of the Pokemon for which the view should be rendered
* @param {string} descriptionText - Description Text of the Pokemon for which the view should be rendered
*/
function renderDetailView(pokemon, descriptionText, evolveChain) {
    let detailView__ContentRef = document.getElementById('detailView__Content');
    detailView__ContentRef.innerHTML = "";
    detailView__ContentRef.innerHTML = getHTMLForDetailView(pokemon, descriptionText);
    let detailView__EvolveContainer = document.getElementById('containerEvolveChain');

    for (let i = 0; i < evolveChain.length; i++) {
        for (let j = 0; j < loadetPokemons.length; j++) {
            if (evolveChain[i] == loadetPokemons[j].name) {
                detailView__EvolveContainer.innerHTML += getHTMLForDetailEvolveChain(loadetPokemons[j]);
            }
        }
    }
}

/**
* Loads the next OR previous Pokemon within the Deatailview
* @param {number} id - ID of the Pokemon which should be loadet
*/
async function loadNextPokemon(id) {
    id = checkPokemonId(id);
    let pokemon = loadetPokemons.find(pokemon => pokemon.id === id);
    let pokemonSpecies = await getPokemonSpecies(pokemon);
    let evolveChain = await getEvolveChain(pokemonSpecies.evolution_chain.url);
    let descriptionText = getFlavorText(pokemonSpecies);
    renderDetailView(pokemon, descriptionText, evolveChain);
    initBackgroundcolorSetting(pokemon);
    if (!muteMode) {
        playCrie(id);
    }
    runmove();
}

/**
* Returns the first found "en" description text of the species object
* @param {object} pokemonSpecies - Species Details of the Pokemon
*/
function getFlavorText(pokemonSpecies) {
    for (let i = 0; i < pokemonSpecies.flavor_text_entries.length; i++) {
        if (pokemonSpecies.flavor_text_entries[i].language.name == "en") {
            return pokemonSpecies.flavor_text_entries[i].flavor_text.replace("", " ");
        }
    }
}

/**
* Initialises the type-dependent setting of the backgroundcolor of the detail view
* @param {object} pokemon - Pokemon for which the backgroundcolor of the detail view should be set
*/
function initBackgroundcolorSetting(pokemon) {
    let arrayOfTypeIds = getTypeIds(pokemon);
    let typesDetailviewRef = document.getElementById('typesDetailview');
    typesDetailviewRef.innerHTML = '';
    if (arrayOfTypeIds.length > 1) {
        typesDetailviewRef.innerHTML = renderDetailViewTwoTypes(pokemon, URL_TYPEIMG + arrayOfTypeIds[0] + ".png", URL_TYPEIMG + arrayOfTypeIds[1] + ".png")
        setBackGroundColorDetailView(arrayOfTypeIds);
    } else {
        typesDetailviewRef.innerHTML = renderDetailViewOneType(pokemon, URL_TYPEIMG + arrayOfTypeIds[0] + ".png")
        setBackGroundColorDetailView(arrayOfTypeIds);
    }
}

/**
* Sets the type-dependent backgroundcolor of the detail view
* @param {(number|Array)} arrayOfTypeIds - List of Type Id's matching the Pokemon
*/
function setBackGroundColorDetailView(arrayOfTypeIds) {
    let detailViewRef = document.getElementById("detailView");
    if (arrayOfTypeIds.length > 1) {
        //TwoBackground
        detailViewRef.style.background = `linear-gradient(160deg, ${TYPES[arrayOfTypeIds[0] - 1].lightColorCode} 0%, ${TYPES[arrayOfTypeIds[0] - 1].darkColorCode} 50%, ${TYPES[arrayOfTypeIds[1] - 1].lightColorCode} 65%, ${TYPES[arrayOfTypeIds[1] - 1].darkColorCode} 100%)`;
    } else {
        //OneBackground
        detailViewRef.style.background = `linear-gradient(120deg, ${TYPES[arrayOfTypeIds[0] - 1].lightColorCode} 0%, ${TYPES[arrayOfTypeIds[0] - 1].darkColorCode} 100%)`;
    }
}

/**
* Checks the limits of Pokemon ID. If a limit is exceeded, an error ID (9999999999) or a more suitable ID is returned
* @param {number} id - Unsafe ID of the Pokemon
* @returns {number} Safe ID of the Pokemon
*/
function checkPokemonId(id) {
    switch (id) {
        case 0:
            return 10277;
        case 1026:
            return 10001;
        case 10000:
            return 1025;
        case 10278:
            return 1;
        default:
            return id;
    }
}

function changeMuteMode() {
    let muteBtnRef = document.getElementById('muteBtn');
    if (muteMode == true) {
        muteMode = false;
        muteBtnRef.innerHTML = '<img src="./assets/icons/googleFontsIcons/volume_on.svg">';
    } else {
        muteMode = true;
        muteBtnRef.innerHTML = '<img src="./assets/icons/googleFontsIcons/volume_off.svg">';
    }
}

/**
    * Fetches all Pokémon in an evolution chain.
    * @param {string} evolutonChainURL - URL of the evolution chain.
    * @returns {Promise<string[]>} Array of Pokémon names in the evolution chain.
    */
async function getEvolveChain(evolutonChainURL) {
    let htmlResponse = await fetch(evolutonChainURL);
    let evolutionData = await htmlResponse.json();
    let evolveChain = []
    getAllEvolutions(evolutionData.chain, evolveChain); // evolveChain wird hier als eine Referenz übergeben. Änderungen am Array in getAllEvolutions wirken daher direkt auf das Array evolveChain. ALLGEMEIN: Objekte und Arrays werden in JS per Referenz übergeben, primitive Typen (Number, String, Boolean) nicht.
    return evolveChain;
}

/**
* Recursively collects all Pokémon names in the evolution chain.
* @param {Object} chain - The current node in the evolution chain.
* @param {string[]} resultArray - Array to store Pokémon names.
*/
function getAllEvolutions(chain, resultArray) {
    resultArray.push(chain.species.name); // pushed den Namen des Pokemon in das Array von dem gerade die Evolutionstufen ermittelt werden
    if (chain.evolves_to && chain.evolves_to.length > 0) { // True wenn es Evolutionen gibt / fals wenn es keine Evolutionen gibt
        chain.evolves_to.forEach(evolution => { //ruft für jede Evolution wieder getAllEvolutions (recursiv)
            getAllEvolutions(evolution, resultArray);
        });
    }
}