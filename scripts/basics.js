/*====================================================================================================
    GLOBAL VARIABLES
====================================================================================================*/
const refGoTopBtn = document.getElementById("goTopBtn");

/*====================================================================================================
    FUNCTIONS
====================================================================================================*/
/**
* Initialise scrollFunction() at window event onscroll
*/
window.onscroll = function () { scrollFunction() };

/**
 * Shows or hides the "Go to Top" button based on scroll position.
 * 
 * @function scrollFunction
 * @returns {void}
 */
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        refGoTopBtn.style.display = "block";
    } else {
        refGoTopBtn.style.display = "none";
    }
}

/**
 * Scrolls the page to the top.
 * 
 * @function topFunction
 * @returns {void}
 */
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/**
 * Toggles a CSS class on an HTML element.
 * 
 * @function toggleClass
 * @param {string} className - The CSS class to toggle.
 * @param {string} identifier - The ID of the HTML element.
 * @returns {void}
 */
function toggleClass(className, identifier) {
    let element = document.getElementById(identifier);
    element.classList.toggle(className);
}

/**
 * Stops the propagation of an event in the DOM.
 * 
 * @function stopPropagation
 * @param {Event} event - The DOM event to stop propagation for.
 * @returns {void}
 */
function stopPropagation(event) {
    event.stopPropagation();
}




