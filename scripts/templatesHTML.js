/**
* Returns the HTML-Code for a Pokemon Card with one Type
* @param {object} loadetPokemon - Pokemon Object for wich a card should be rendert
* @param {string} typeURL - Image URL for Type One
* @returns {string} - The HTML-Code for a Pokemon Card with one Type
*/
function getHTMLForCardWithOneType(loadetPokemon, typeURL) {
    return `
                    <div class="card" id="card${loadetPokemon.id}" onclick="openDetailDialog(${loadetPokemon.id})">
                        <div class="card__ImgContainer">
                            <img src="${loadetPokemon.sprites.other['official-artwork'].front_default}"
                            alt="" class="card__Img" id="card__Img${loadetPokemon.id}">
                        </div> 
                        <p class="card__No" id="card__No${loadetPokemon.id}">No #${loadetPokemon.id}</p>
                        <p class="card__Name" id="card__Name${loadetPokemon.id}">${loadetPokemon.name}</p>
                        <div class="card__Types" id="card__Types${loadetPokemon.id}">
                            <div class="card__type">
                                <img src="${typeURL}"
                                    alt="" class="type__Img" id="type__Img${loadetPokemon.id}1">
                            </div>
                        </div>
                    </div>
    `
}

/**
* Returns the HTML-Code for a Pokemon Card with two Types
* @param {object} loadetPokemon - Pokemon Object for wich a card should be rendert
* @param {string} type1URL - Image URL for Type One
* @param {string} type2URL - Image URL for Type Two
* @returns {string} - The HTML-Code for a Pokemon Card with one Type
*/
function getHTMLForCardWithTwoTypes(loadetPokemon, type1URL, type2URL) {
    return `
                    <div class="card" id="card${loadetPokemon.id}" onclick="openDetailDialog(${loadetPokemon.id})">
                        <div class="card__ImgContainer">
                            <img src="${loadetPokemon.sprites.other['official-artwork'].front_default}"
                            alt="" class="card__Img" id="card__Img${loadetPokemon.id}">
                        </div> 
                        <p class="card__No" id="card__No${loadetPokemon.id}">No #${loadetPokemon.id}</p>
                        <p class="card__Name" id="card__Name${loadetPokemon.id}">${loadetPokemon.name}</p>
                        <div class="card__Types" id="card__Types${loadetPokemon.id}">
                            <div class="card__type">
                                <img src="${type1URL}"
                                    alt="" class="type__Img" id="type__Img${loadetPokemon.id}1">
                            </div>
                            <div class="card__type">
                                <img src="${type2URL}"
                                    alt="" class="type__Img" id="type__Img${loadetPokemon.id}2">
                            </div>
                        </div>
                    </div>
    `
}

/**
* Returns the HTML-Code for a Pokemon detail view
* @param {object} pokemon - Pokemon object for which the detail view should be displayed
* @param {string} descriptionText - Description Text which should be displayed
* @returns {string} - The HTML-Code for a Pokemon detail view
*/
function getHTMLForDetailView(pokemon, nextPokemon, previousPokemon, descriptionText) {
    return `

            <button type="button" class="btn-close" aria-label="Close"
                onclick="toggleClass('d_none', 'detailView'), toggleClass('overflowHidden', 'body')"></button>
            <button type="button" class="moveBtn" id="previousPokemonBtn" aria-label="previous"
                onclick="loadNextPokemon(${previousPokemon.id})"><img src="./assets/icons/googleFontsIcons/left.svg" alt="left">
            </button>
            <button type="button" class="moveBtn" id="nextPokemonBtn" aria-label="previous"
                onclick="loadNextPokemon(${nextPokemon.id})"><img src="./assets/icons/googleFontsIcons/right.svg" alt="right">
            </button>
            <div class="detailView__Img" id="detailView__Img"><img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
                    alt="">
            </div>
            <div class="mainDetailInfo">
                <p class="card__No" id="noDetailview">No #${pokemon.id}</p>
                <p class="card__Name" id="nameDetailview">${pokemon.name}</p>
                <div class="card__Types" id="typesDetailview">
                
                </div>
                <div class="physicalInfoContainer">
                    <div class="physicalInfo"><b>HEIGHT:</b> ${pokemon.height}</div>
                    <div class="physicalInfo"><b>WEIGHT:</b> ${pokemon.weight}</div>
                </div>
            </div>
            <div class="deepDetailInfo">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne" aria-expanded="false"
                                aria-controls="flush-collapseOne">
                                Description
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <p>
                                    ${descriptionText}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo" aria-expanded="true"
                                aria-controls="flush-collapseTwo">
                                Stats Item
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse show"
                            data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div class="statsNamesContainer">
                                    <p>HP:</p>
                                    <p>ATTACK:</p>
                                    <p>DEFENSE:</p>
                                    <p>SPECIAL-ATTACK:</p>
                                    <p>SPECIAL-DEFENSE:</p>
                                    <p>SPEED:</p>
                                </div>
                                <div class="containerPorogress statsContainer">
                                    <div class="progress" role="progressbar" aria-label="Basic example"
                                        aria-valuenow="${pokemon.stats[0].base_stat}" aria-valuemin="0" aria-valuemax="255">
                                        <div id="hpStats" class="progress-bar" style="width: ${(pokemon.stats[0].base_stat * 100) / 255}%">${pokemon.stats[0].base_stat}</div>
                                    </div>
                                    <div class="progress" role="progressbar" aria-label="Basic example"
                                        aria-valuenow="${pokemon.stats[1].base_stat}" aria-valuemin="0" aria-valuemax="255">
                                        <div id="attackStats" class="progress-bar" style="width: ${(pokemon.stats[1].base_stat * 100) / 255}%">${pokemon.stats[1].base_stat}</div>
                                    </div>
                                    <div class="progress" role="progressbar" aria-label="Basic example"
                                        aria-valuenow="${pokemon.stats[2].base_stat}" aria-valuemin="0" aria-valuemax="255">
                                        <div id="defenseStats" class="progress-bar" style="width: ${(pokemon.stats[2].base_stat * 100) / 255}%">${pokemon.stats[2].base_stat}</div> 
                                    </div>
                                    <div class="progress" role="progressbar" aria-label="Basic example"
                                        aria-valuenow="${pokemon.stats[3].base_stat}" aria-valuemin="0" aria-valuemax="255">
                                        <div id="sAttackStats" class="progress-bar" style="width: ${(pokemon.stats[3].base_stat * 100) / 255}%">${pokemon.stats[3].base_stat}</div>
                                    </div>
                                    <div class="progress" role="progressbar" aria-label="Basic example"
                                        aria-valuenow="${pokemon.stats[4].base_stat}" aria-valuemin="0" aria-valuemax="255">
                                        <div id="sDefenseStats" class="progress-bar" style="width: ${(pokemon.stats[4].base_stat * 100) / 255}%">${pokemon.stats[4].base_stat}</div>
                                    </div>
                                    <div class="progress" role="progressbar" aria-label="Basic example"
                                        aria-valuenow="${pokemon.stats[5].base_stat}" aria-valuemin="0" aria-valuemax="255">
                                        <div id="speedStats" class="progress-bar" style="width: ${(pokemon.stats[5].base_stat * 100) / 255}%">${pokemon.stats[5].base_stat}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree" aria-expanded="false"
                                aria-controls="flush-collapseThree">
                                Evolve Chain
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body jc_center">
                                <div id="containerEvolveChain" class="containerEvolveChain">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `
}

function getHTMLForDetailEvolveChain(pokemon) {
    return `
        <img class="evolveChainImg" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="">
    `
}

/**
* Returns the type spezific HTML-Code for a Pokemon detail view with one Type
* @param {object} pokemon - Pokemon object for which the detail view should be displayed
* @param {object} type1URL - Image URL for Type One
* @returns {string} - The type spezific HTML-Code for a Pokemon detail view with one Type
*/
function renderDetailViewOneType(pokemon, type1URL) {
    return `
                    <div class="card__type">
                        <img src="${type1URL}"
                            alt="" class="type__Img" id="type__ImgDetailview${pokemon.id}1">
                    </div>
    `
}

/**
* Returns the type spezific HTML-Code for a Pokemon detail view with two Types
* @param {object} pokemon - Pokemon object for which the detail view should be displayed
* @param {object} type1URL - Image URL for Type One
* @param {object} type2URL - Image URL for Type Two
* @returns {string} - The type spezific HTML-Code for a Pokemon detail view with two Types
*/
function renderDetailViewTwoTypes(pokemon, type1URL, type2URL) {
    return `
                    <div class="card__type">
                        <img src="${type1URL}"
                            alt="" class="type__Img" id="type__ImgDetailview${pokemon.id}1">
                    </div>
                    <div class="card__type">
                        <img src="${type2URL}"
                            alt="" class="type__Img" id="type__ImgDetailview${pokemon.id}1">
                    </div>
    `
}
