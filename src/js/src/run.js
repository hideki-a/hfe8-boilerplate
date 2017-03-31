"use strict";

(function (window, document, undefined) {
    if (!Modernizr.objectfit) {
        // https://medium.com/@primozcigler/neat-trick-for-css-object-fit-fallback-on-edge-and-other-browsers-afbc53bbb2c3
        const fallbackElems = document.querySelectorAll(".js-Fallback_objectFit");
        Array.from(fallbackElems, (elem) => {
            const imageUrl = elem.getAttribute("src");
            const containerElem = elem.parentNode;

            if (imageUrl) {
                containerElem.style.backgroundImage = "url('" + imageUrl + "');";
                containerElem.classList.add("js-Compat_objectFit");
            }
        });
    }
}(window, document));
