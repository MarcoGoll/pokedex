/**
 * Opens the detail view dialog for a specific Pokémon.
 * 
 * @async
 * @function openDetailDialog
 * @param {number|string} id - The ID of the Pokémon to display in detail.
 * @returns {Promise<void>} A promise that resolves when the detail view is displayed.
 */
async function openDetailDialog(id) {
    await loadNextPokemon(id);
    toggleClass('d_none', 'detailView');
    toggleClass('overflowHidden', 'body');

}

/**
 * Plays the cry sound of a Pokémon by its ID.
 * 
 * @function playCrie
 * @param {number|string} id - The ID of the Pokémon whose cry should be played.
 * @returns {void}
 */
function playCrie(id) {
    let crie = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`);
    crie.volume = 0.01;
    crie.play();
}

/**
 * Renders the detailed view for a specific Pokémon, including its evolution chain.
 * 
 * @async
 * @function renderDetailView
 * @param {Object} pokemon - The Pokémon object to display in detail.
 * @param {Object|null} nextPokemon - The next Pokémon in the list (if any).
 * @param {Object|null} previousPokemon - The previous Pokémon in the list (if any).
 * @param {string} descriptionText - A text description of the Pokémon.
 * @param {Array<string>} evolveChain - An array of Pokémon names representing the evolution chain.
 * @returns {Promise<void>} A promise that resolves when the detail view has been fully rendered.
 */
async function renderDetailView(pokemon, nextPokemon, previousPokemon, descriptionText, evolveChain) {
    let detailView__ContentRef = document.getElementById('detailView__Content');
    detailView__ContentRef.innerHTML = "";
    detailView__ContentRef.innerHTML = getHTMLForDetailView(pokemon, nextPokemon, previousPokemon, descriptionText);
    let detailView__EvolveContainer = document.getElementById('containerEvolveChain');
    for (let i = 0; i < evolveChain.length; i++) {
        let pokemon = await getPokemonByName(evolveChain[i])
        detailView__EvolveContainer.innerHTML += getHTMLForDetailEvolveChain(pokemon);
    }
}

/**
 * Loads detailed data for a Pokémon and prepares the detail view.
 * 
 * @async
 * @function loadNextPokemon
 * @param {number|string} id - The ID of the Pokémon to load.
 * @returns {Promise<void>} A promise that resolves when the Pokémon detail view is fully prepared and displayed.
 */
async function loadNextPokemon(id) {
    id = checkPokemonId(id);
    if (searchMode) {
        const currentIndex = searchedPokemon.findIndex(pokemon => pokemon.id === id);
        pokemon = searchedPokemon[currentIndex];
        nextPokemon = searchedPokemon[currentIndex + 1] == undefined ? searchedPokemon[currentIndex] : searchedPokemon[currentIndex + 1]
        previousPokemon = searchedPokemon[currentIndex - 1] == undefined ? searchedPokemon[currentIndex] : searchedPokemon[currentIndex - 1];
    } else {
        const currentIndex = loadetPokemons.findIndex(pokemon => pokemon.id === id);
        pokemon = loadetPokemons[currentIndex];
        nextPokemon = loadetPokemons[currentIndex + 1] == undefined ? loadetPokemons[currentIndex] : loadetPokemons[currentIndex + 1];
        previousPokemon = loadetPokemons[currentIndex - 1] == undefined ? loadetPokemons[currentIndex] : loadetPokemons[currentIndex - 1]
    }
    let pokemonSpecies = await getPokemonSpecies(pokemon);
    let evolveChain = await getEvolveChain(pokemonSpecies.evolution_chain.url);
    let descriptionText = getFlavorText(pokemonSpecies);
    renderDetailView(pokemon, nextPokemon, previousPokemon, descriptionText, evolveChain);
    initBackgroundcolorSetting(pokemon);
    if (!muteMode) {
        playCrie(id);
    }
    runmove();
}


/**
 * Retrieves the English flavor text description for a Pokémon species.
 * 
 * @function getFlavorText
 * @param {Object} pokemonSpecies - The Pokémon species object containing flavor text entries.
 * @param {Array} pokemonSpecies.flavor_text_entries - Array of flavor text objects with language and text.
 * @returns {string|undefined} The English flavor text description, or undefined if none is found.
 */
function getFlavorText(pokemonSpecies) {
    for (let i = 0; i < pokemonSpecies.flavor_text_entries.length; i++) {
        if (pokemonSpecies.flavor_text_entries[i].language.name == "en") {
            return pokemonSpecies.flavor_text_entries[i].flavor_text.replace("", " ");
        }
    }
}

/**
 * Initializes and sets the background color for a Pokémon's detail view based on its type(s).
 * 
 * @function initBackgroundcolorSetting
 * @param {Object} pokemon - The Pokémon object for which to set the background.
 * @returns {void}
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
 * Sets the background gradient of the Pokémon detail view based on its type(s).
 * 
 * @function setBackGroundColorDetailView
 * @param {number[]} arrayOfTypeIds - An array of type IDs associated with the Pokémon.
 * @returns {void}
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
 * Normalizes Pokémon IDs to valid values for the API.
 * 
 * @function checkPokemonId
 * @param {number} id - The original Pokémon ID.
 * @returns {number} The normalized Pokémon ID.
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

/**
 * Toggles the application's mute mode on or off.
 * 
 * @function changeMuteMode
 * @returns {void}
 */
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
 * Fetches and returns the full evolution chain of a Pokémon.
 * 
 * @async
 * @function getEvolveChain
 * @param {string} evolutonChainURL - The URL to fetch the Pokémon's evolution chain.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of Pokémon names in the evolution chain.
 */
async function getEvolveChain(evolutonChainURL) {
    let htmlResponse = await fetch(evolutonChainURL);
    let evolutionData = await htmlResponse.json();
    let evolveChain = []
    getAllEvolutions(evolutionData.chain, evolveChain); // evolveChain wird hier als eine Referenz übergeben. Änderungen am Array in getAllEvolutions wirken daher direkt auf das Array evolveChain. ALLGEMEIN: Objekte und Arrays werden in JS per Referenz übergeben, primitive Typen (Number, String, Boolean) nicht.
    return evolveChain;
}

/**
 * Recursively extracts all Pokémon names from an evolution chain.
 * 
 * @function getAllEvolutions
 * @param {Object} chain - The current node in the Pokémon evolution chain.
 * @param {string[]} resultArray - The array to which all Pokémon names are appended.
 * @returns {void}
 */
function getAllEvolutions(chain, resultArray) {
    resultArray.push(chain.species.name); // pushed den Namen des Pokemon in das Array von dem gerade die Evolutionstufen ermittelt werden
    if (chain.evolves_to && chain.evolves_to.length > 0) { // True wenn es Evolutionen gibt / fals wenn es keine Evolutionen gibt
        chain.evolves_to.forEach(evolution => { //ruft für jede Evolution wieder getAllEvolutions (recursiv)
            getAllEvolutions(evolution, resultArray);
        });
    }
}