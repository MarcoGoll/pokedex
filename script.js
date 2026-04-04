/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
const URL_ALLPOKEMON = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100000";
const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";
const URL_POKEMONSPECIES = "https://pokeapi.co/api/v2/pokemon-species/";
const URL_TYPEIMG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-shining-pearl/";
const ERROR_FETCHCATCH = "Schnittstellen-Aufruf ist fehlgeschlagen. Bitte versuchen Sie es Später wieder.";
const LIGHTOPACITY = "0.6";
const DARKOPACITY = "1";
const LOADAMOUNT = 100;
const TYPES = [
    {
        "typeName": "normal",
        "id": 1,
        "lightColorCode": `rgba(153,153,153,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(153,153,153,${DARKOPACITY})`
    },
    {
        "typeName": "fighting",
        "id": 2,
        "lightColorCode": `rgba(255,162,2,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(255,162,2,${DARKOPACITY})`
    },
    {
        "typeName": "flying",
        "id": 3,
        "lightColorCode": `rgba(149,201,255,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(149,201,255, ${DARKOPACITY})`
    },
    {
        "typeName": "poison",
        "id": 4,
        "lightColorCode": `rgba(153,77,207,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(153,77,207,${DARKOPACITY})`
    },
    {
        "typeName": "ground",
        "id": 5,
        "lightColorCode": `rgba(171,121,57,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(171,121,57,${DARKOPACITY})`
    },
    {
        "typeName": "rock",
        "id": 6,
        "lightColorCode": `rgba(188,184,137,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(188,184,137,${DARKOPACITY})`
    },
    {
        "typeName": "bug",
        "id": 7,
        "lightColorCode": `rgba(159,164,36,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(159,164,36,${DARKOPACITY})`
    },
    {
        "typeName": "ghost",
        "id": 8,
        "lightColorCode": `rgba(113,71,113,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(113,71,113,${DARKOPACITY})`
    },
    {
        "typeName": "steel",
        "id": 9,
        "lightColorCode": `rgba(106,174,211,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(106,174,211,${DARKOPACITY})`
    },
    {
        "typeName": "fire",
        "id": 10,
        "lightColorCode": `rgba(255,97,44,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(255,97,44,${DARKOPACITY})`
    },
    {
        "typeName": "water",
        "id": 11,
        "lightColorCode": `rgba(41,146,255,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(41,146,255,${DARKOPACITY})`
    },
    {
        "typeName": "grass",
        "id": 12,
        "lightColorCode": `rgba(66,191,36,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(66,191,36,${DARKOPACITY})`
    },
    {
        "typeName": "electric",
        "id": 13,
        "lightColorCode": `rgba(255,219,0,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(255,219,0,${DARKOPACITY})`
    },
    {
        "typeName": "psychic",
        "id": 14,
        "lightColorCode": `rgba(255,99,127,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(255,99,127,${DARKOPACITY})`
    },
    {
        "typeName": "ice",
        "id": 15,
        "lightColorCode": `rgba(66,191,255,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(66,191,255,${DARKOPACITY})`
    },
    {
        "typeName": "dragon",
        "id": 16,
        "lightColorCode": `rgba(84,98,214,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(84,98,214,${DARKOPACITY})`
    },
    {
        "typeName": "dark",
        "id": 17,
        "lightColorCode": `rgba(79,71,71,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(79,71,71,${DARKOPACITY})`
    },
    {
        "typeName": "fairy",
        "id": 18,
        "lightColorCode": `rgba(255,177,255,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(255,177,255,${DARKOPACITY})`
    },
    {
        "typeName": "stellar",
        "id": 19,
        "lightColorCode": `rgba(0,0,0,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(0,0,0,${DARKOPACITY})`
    },
    {
        "typeName": "unknown",
        "id": 10001,
        "lightColorCode": `rgba(0,0,0,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(0,0,0,${DARKOPACITY})`
    },
    {
        "typeName": "myUnknown",
        "id": 99999,
        "lightColorCode": `rgba(0,0,0,${LIGHTOPACITY})`,
        "darkColorCode": `rgba(0,0,0,${DARKOPACITY})`
    }
];
let reachedEnd = false;
let allPokemons = []; // {name, url}
let loadetPokemons = []; // detailinfos
let searchedPokemon = [];
let currentlyRendertCounter = 0;
let cardsContainerRef = document.getElementById('cardsContainer');
let loadMoreBtnRef = document.getElementById('loadNextBtn');
let searchMode = false;
let muteMode = true;

/*====================================================================================================
    FUNCTIONS
====================================================================================================*/
/**
 * Initializes the application.
 * 
 * This function loads all Pokémon data, clears the card container,
 * and renders an initial set of Pokémon cards.
 * 
 * @async
 * @function init
 * @returns {Promise<void>} A promise that resolves when initialization is complete.
 */
async function init() {
    await setAllPokemons();
    cardsContainerRef.innerHTML = "";
    renderCardsAmount(currentlyRendertCounter, LOADAMOUNT);
}

/**
 * Fetches and stores a list of all Pokémon.
 *
 * @async
 * @function setAllPokemons
 * @returns {Promise<void>} A promise that resolves when the Pokémon list has been fetched and stored.
 */
async function setAllPokemons() {
    try {
        let listOfAllPokemon = await fetch(URL_ALLPOKEMON);
        let listOfAllPokemonAsJSON = await listOfAllPokemon.json();
        allPokemons = listOfAllPokemonAsJSON.results;
    } catch (error) {
        console.error(ERROR_FETCHCATCH);
    }
}

/**
 * Renders a specific amount of Pokémon cards starting from a given index.
 * 
 * @async
 * @function renderCardsAmount
 * @param {number} start - The starting index from which Pokémon should be rendered.
 * @param {number} amount - The number of Pokémon to render.
 * @returns {Promise<void>} A promise that resolves when the cards have been rendered.
 */
async function renderCardsAmount(start, amount) {
    let forEend = start + amount;
    if (forEend > allPokemons.length) {
        forEend = allPokemons.length;
    }
    if (!reachedEnd) {
        toggleClass("d_none", "spinnerContainer");
        await addloadetPokemons(start, amount);
        for (let i = start; i < forEend; i++) {
            currentlyRendertCounter++;
            let arrayOfTypeIds = getTypeIds(loadetPokemons[i]);
            if (arrayOfTypeIds.length > 1) {
                cardsContainerRef.innerHTML += getHTMLForCardWithTwoTypes(loadetPokemons[i], URL_TYPEIMG + arrayOfTypeIds[0] + ".png", URL_TYPEIMG + arrayOfTypeIds[1] + ".png");
                setBackGroundColorCard(loadetPokemons[i].id, arrayOfTypeIds);
            } else {
                cardsContainerRef.innerHTML += getHTMLForCardWithOneType(loadetPokemons[i], URL_TYPEIMG + arrayOfTypeIds[0] + ".png");
                setBackGroundColorCard(loadetPokemons[i].id, arrayOfTypeIds);
            }
        }
        setPokemonCount();
        loadMoreBtnRef.disabled = false;
        toggleClass("d_none", "spinnerContainer");
        document.getElementById('loadNextContainer').classList.remove("d_none");
    }
}

/**
 * Loads a batch of Pokémon data and stores it in the global array.
 * 
 * @async
 * @function addloadetPokemons
 * @param {number} start - The starting index from which Pokémon should be loaded.
 * @param {number} amount - The number of Pokémon to load.
 * @returns {Promise<void>} A promise that resolves when all Pokémon data has been loaded and stored.
 */
async function addloadetPokemons(start, amount) {
    let forEend = start + amount;
    let currentlyLoadetPokemonAsPromises = []
    if (forEend > allPokemons.length) {
        forEend = allPokemons.length;
        reachedEnd = true;
    }
    for (let i = start; i < forEend; i++) {
        try {
            currentlyLoadetPokemonAsPromises.push(getPokemonByName(allPokemons[i].name));
        } catch (error) {
            console.error(ERROR_FETCHCATCH);
        }
    }
    loadetPokemons.push(... await Promise.all(currentlyLoadetPokemonAsPromises))
}

/**
 * Fetches detailed Pokémon data by its ID.
 * 
 * @async
 * @function getPokemonById
 * @param {number|string} id - The unique identifier of the Pokémon.
 * @returns {Promise<Object|undefined>} A promise that resolves to the Pokémon data object,
 * or undefined if an error occurs.
 */
async function getPokemonById(id) {

    try {
        let detailsPokemonX = await fetch(URL_POKEMON + id);
        return await detailsPokemonX.json();
    } catch (error) {
        console.error(ERROR_FETCHCATCH);
    }
}

/**
 * Fetches detailed Pokémon data by its name.
 * 
 * @async
 * @function getPokemonByName
 * @param {string} name - The name of the Pokémon.
 * @returns {Promise<Object|undefined>} A promise that resolves to the Pokémon data object,
 * or undefined if an error occurs.
 */
async function getPokemonByName(name) {
    try {
        let detailsPokemonX = await fetch(URL_POKEMON + name);
        return await detailsPokemonX.json();
    } catch (error) {
        console.error(ERROR_FETCHCATCH);
    }
}

/**
 * Fetches species data for a given Pokémon.
 * 
 * @async
 * @function getPokemonSpecies
 * @param {Object} pokemon - The Pokémon object containing a species property with a URL.
 * @param {Object} pokemon.species - The species reference object.
 * @param {string} pokemon.species.url - The API URL for the species data.
 * @returns {Promise<Object|undefined>} A promise that resolves to the species data object,
 * or undefined if an error occurs.
 */
async function getPokemonSpecies(pokemon) {
    try {
        let speciesPokemonX = await fetch(pokemon.species.url);
        return await speciesPokemonX.json();
    } catch (error) {
        console.error(ERROR_FETCHCATCH);
    }
}

/**
 * Extracts type IDs for a given Pokémon.
 * 
 * @function getTypeIds
 * @param {Object} pokemon - The Pokémon object containing type information.
 * @param {Array} pokemon.types - An array of type objects assigned to the Pokémon.
 * @returns {number[]} An array of type IDs corresponding to the Pokémon's types.
 */
function getTypeIds(pokemon) {
    let foundTypes = [];
    pokemon.types.forEach((type, i) => {
        foundTypes.push(pokemon.types[i].type.name)
    });

    let foundIds = [];
    for (let i = 0; i < foundTypes.length; i++) {
        TYPES.forEach(type => {
            if (type.typeName == foundTypes[i]) {
                foundIds.push(type.id);
            }
        });
    }
    return foundIds;
}

/**
 * Sets the background style of a Pokémon card based on its type(s).
 * 
 * @function setBackGroundColorCard
 * @param {number|string} id - The unique ID of the Pokémon, used to find the card element.
 * @param {number[]} arrayOfTypeIds - An array of type IDs associated with the Pokémon.
 * @returns {void}
 */
function setBackGroundColorCard(id, arrayOfTypeIds) {
    let cardRef = document.getElementById("card" + id);
    if (arrayOfTypeIds.length > 1) {
        //TwoBackground
        cardRef.style.background = `linear-gradient(160deg, ${TYPES[arrayOfTypeIds[0] - 1].lightColorCode} 0%, ${TYPES[arrayOfTypeIds[0] - 1].darkColorCode} 50%, ${TYPES[arrayOfTypeIds[1] - 1].lightColorCode} 65%, ${TYPES[arrayOfTypeIds[1] - 1].darkColorCode} 100%)`;

    } else {
        //OneBackground
        cardRef.style.background = `linear-gradient(120deg, ${TYPES[arrayOfTypeIds[0] - 1].lightColorCode} 0%, ${TYPES[arrayOfTypeIds[0] - 1].darkColorCode} 100%)`;
    }
}

/**
 * Starts next render process as soon as more Pokemon are to be loaded
 *
 * @function loadNextPokemonsOverview
 * @returns {void}
 */
function loadNextPokemonsOverview() {
    renderCardsAmount(currentlyRendertCounter, LOADAMOUNT)
}

/**
 * Renders Pokémon cards for a given array of Pokémon IDs.
 * 
 * @async
 * @function renderCardsIds
 * @param {Array<number|string>} pokemonIds - An array of Pokémon IDs to render.
 * @returns {Promise<void>} A promise that resolves once all Pokémon cards are rendered.
 */
async function renderCardsIds(pokemonIds) {
    toggleClass("d_none", "spinnerContainer");
    searchedPokemon = [];
    cardsContainerRef.innerHTML = "";
    for (let i = 0; i < pokemonIds.length; i++) {
        searchedPokemon.push(await getPokemonById(pokemonIds[i]))
        let arrayOfTypeIds = getTypeIds(searchedPokemon[i]);
        if (arrayOfTypeIds.length > 1) {
            cardsContainerRef.innerHTML += getHTMLForCardWithTwoTypes(searchedPokemon[i], URL_TYPEIMG + arrayOfTypeIds[0] + ".png", URL_TYPEIMG + arrayOfTypeIds[1] + ".png");
            setBackGroundColorCard(searchedPokemon[i].id, arrayOfTypeIds);
        } else {
            cardsContainerRef.innerHTML += getHTMLForCardWithOneType(searchedPokemon[i], URL_TYPEIMG + arrayOfTypeIds[0] + ".png");
            setBackGroundColorCard(searchedPokemon[i].id, arrayOfTypeIds);
        }
    }
    toggleClass("d_none", "spinnerContainer");
}

/**
 * Resets the Pokémon overview to its initial state.
 * 
 * @function reset
 * @returns {void}
 */
function reset() {
    currentlyRendertCounter = 0;
    loadetPokemons = [];
    cardsContainerRef.innerHTML = "";
    searchMode = false;
    loadMoreBtnRef.disabled = false;
    muteMode = true;
}

/**
 * Initiates loading of the next batch of Pokémon cards if not in search mode.
 * 
 * @function initLoadNextPokemonsOverview
 * @returns {void}
 */
function initLoadNextPokemonsOverview() {
    if (searchMode == false) {
        loadMoreBtnRef.disabled = true;
        loadNextPokemonsOverview();
    }
}

/**
 * Updates the displayed count of loaded Pokémon.
 * 
 * @function setPokemonCount
 * @returns {void}
 */
function setPokemonCount() {
    let txtAmountRef = document.getElementById('txtAmount');
    txtAmountRef.innerHTML = `${loadetPokemons.length} von ${allPokemons.length}`
}
