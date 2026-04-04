/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
let searchInputRef = document.getElementById('searchInput');
let searchBtnRef = document.getElementById('searchBtn');

/*====================================================================================================
    FUNCTIONS
====================================================================================================*/
/**
* Initialises the search process
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
* Searches for the search string in the list of all Pokemon, comparing name and search string. The IDs of hits are returned in an array
* @param {string} searchString - String to be searched for
* @returns {(number|Array)} ID's of Pokemon where the search string matches the name
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
* Set all CSS classes that should be present for an EmptySearchString
*/
function setCSSClassesForEmptySearchString() {
    searchInputRef.classList.remove("inputInvalide");
    searchBtnRef.classList.remove("inputInvalideBtn");
    searchInputRef.classList.remove("inputValide")
    searchBtnRef.classList.remove("inputValideBtn");
}

/**
* Set all CSS classes that should be present for an ValideSearchString
*/
function setCSSClassesForValideSearchString() {
    searchInputRef.classList.add("inputValide");
    searchInputRef.classList.remove("inputInvalide");
    searchBtnRef.classList.add("inputValideBtn");
    searchBtnRef.classList.remove("inputInvalideBtn");
}

/**
* Set all CSS classes that should be present for an InvalideSearchString
*/
function setCSSClassesForInvalideSearchString() {
    searchInputRef.classList.add("inputInvalide");
    searchInputRef.classList.remove("inputValide");
    searchBtnRef.classList.add("inputInvalideBtn");
    searchBtnRef.classList.remove("inputValideBtn");
}