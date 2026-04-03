/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
const URL_ALLPOKEMON = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100000";
const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon/";
const URL_POKEMONSPECIES = "https://pokeapi.co/api/v2/pokemon-species/";
const URL_TYPEIMG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/";
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
* Initialises the loading of all Pokemon into an array AND the rendering of a defined number of Pokemon
*/
async function init() {
    await setAllPokemons();
    cardsContainerRef.innerHTML = "";
    renderCardsAmount(currentlyRendertCounter, LOADAMOUNT);
}

/**
* Loads all Pokemon and writes their name and URL to an array
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
* Creates a certain number of Pokemon cards in the overview. 
* @param {number} start - Index from which to start
* @param {number} amount - Number to be rendered from the start (index)
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
* Loads a certain number of Pokemon details and writes them into an array 
* @param {number} start - Index from which to start
* @param {number} amount - Number to be rendered from the start (index)
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
* Returns detailed information about a Pokemon based on an ID
* @param {number} id - Identifier of the Pokemon
* @returns {object} - A Pokemon object
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
* Returns detailed information about a Pokemon based on a Name
* @param {number} name - Name of the Pokemon
* @returns {object} - A Pokemon object
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
* Returns species information about a Pokemon based on a Pokemon object
* @param {object} pokemon - Pokemon object
* @returns {object} - A Pokemon Object
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
* Returns an Array of type Id's matching the pokemon (based on a Pokemon object)
* @param {object} pokemon - Pokemon object
* @returns {(string|Array)} - All type ID's matching the pokemon
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
* Sets the Backgroundcolor of a card within the overview
* @param {number} id - ID of the Pokemon
* @param {(string|Array)} arrayOfTypeIds - All type ID's matching the pokemon
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
*/
function loadNextPokemonsOverview() {
    renderCardsAmount(currentlyRendertCounter, LOADAMOUNT)
}

/**
* Creates Pokemon cards in the overview, which are created for a list of IDs (e.g. search results)
* @param {(number|Array)} pokemonIds - Array of ID's wich should be displayed in the Overview
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
* Reset the WebApp 
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
* initialise loadNextPokemon
*/
function initLoadNextPokemonsOverview() {
    if (searchMode == false) {
        loadMoreBtnRef.disabled = true;
        loadNextPokemonsOverview();
    }
}

/**
* set the current Pokemon Amount
*/
function setPokemonCount() {
    let txtAmountRef = document.getElementById('txtAmount');
    txtAmountRef.innerHTML = `${loadetPokemons.length} von ${allPokemons.length}`
}
