/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
let className = "move";

/*====================================================================================================
    FUNCTIONS
====================================================================================================*/
/**
 * Animates a Pokémon image in the detail view.
 * 
 * @function runmove
 * @returns {void}
 */
function runmove() {
    let movingElementRef = document.getElementById('detailView__Img');
    startmove(movingElementRef);
    setTimeout(() => {
        endmove(movingElementRef);
    }, 300);
}

/**
 * Starts a movement animation on a given element by adding a CSS class.
 * 
 * @function startmove
 * @param {HTMLElement} movingElementRef - The DOM element to animate.
 * @returns {void}
 */
function startmove(movingElementRef) {
    movingElementRef.classList.add(className);
}

/**
 * Ends a movement animation on a given element by removing a CSS class.
 * 
 * @function endmove
 * @param {HTMLElement} movingElementRef - The DOM element to stop animating.
 * @returns {void}
 */
function endmove(movingElementRef) {
    movingElementRef.classList.remove(className);
}

