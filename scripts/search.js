/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
let searchInputRef = document.getElementById('searchInput');
let searchBtnRef = document.getElementById('searchBtn');

/*====================================================================================================
    FUNCTIONS
====================================================================================================*/
/**
 * Initializes the Pokémon search process based on the user's input.
 * 
 * @async
 * @function initSearchPokemon 
 * @returns {Promise<void>} A promise that resolves when the search initialization is complete.
 */
async function initSearchPokemon() {
    if (searchInputRef.value.length == "") {
        setCSSClassesForEmptySearchString();
        reset();
        renderCardsAmount(currentlyRendertCounter, LOADAMOUNT);
    }
    else if (searchInputRef.value.length >= 3) {
        searchMode = true;
        document.getElementById('loadNextContainer').classList.add("d_none");
        setCSSClassesForValideSearchString();
        let searchResults = await searchPokemon(searchInputRef.value);
        if (searchResults.length == 0) {
            cardsContainerRef.innerHTML = '<p class="txtNoResult">Zu Ihrem Suchbegriff, konnten keine Pokemon gefunden werden.</p>';
        } else {
            renderCardsIds(searchResults);
        }

    } else {
        setCSSClassesForInvalideSearchString();
    }
}

/**
 * Searches for Pokémon whose names include the given search string.
 * 
 * @async
 * @function searchPokemon
 * @param {string} searchString - The string to search for in Pokémon names.
 * @returns {Promise<number[]>} A promise that resolves to an array of Pokémon IDs matching the search string.
 */
async function searchPokemon(searchString) {
    let searchedResult = [];
    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i].name.includes(searchString.toLowerCase())) {
            let pokemon = await getPokemonByName(allPokemons[i].name);
            searchedResult.push(pokemon.id);
        }
    }
    return searchedResult;
}

/**
 * Resets the CSS classes for the search input and button when the search string is empty.
 * 
 * @function setCSSClassesForEmptySearchString
 * @returns {void}
 */
function setCSSClassesForEmptySearchString() {
    searchInputRef.classList.remove("inputInvalide");
    searchBtnRef.classList.remove("inputInvalideBtn");
    searchInputRef.classList.remove("inputValide")
    searchBtnRef.classList.remove("inputValideBtn");
}

/**
 * Applies CSS classes to indicate a valid search input string.
 * 
 * @function setCSSClassesForValideSearchString
 * @returns {void}
 */
function setCSSClassesForValideSearchString() {
    searchInputRef.classList.add("inputValide");
    searchInputRef.classList.remove("inputInvalide");
    searchBtnRef.classList.add("inputValideBtn");
    searchBtnRef.classList.remove("inputInvalideBtn");
}

/**
 * Applies CSS classes to indicate an invalid search input string.
 * 
 * @function setCSSClassesForInvalideSearchString
 * @returns {void}
 */
function setCSSClassesForInvalideSearchString() {
    searchInputRef.classList.add("inputInvalide");
    searchInputRef.classList.remove("inputValide");
    searchBtnRef.classList.add("inputInvalideBtn");
    searchBtnRef.classList.remove("inputValideBtn");
}