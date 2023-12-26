/**
 * Administra el elemento #loader
 * @param {boolean} show Si se muestra el elemento o no
 * @returns {boolean}
 */
function loaderManager(show = false) {
    const loaderElement = document.querySelector('#loader-container');

    if (!loaderElement || loaderElement === undefined || loaderElement === null)
        return false;
    if (show === undefined || show === null)
        show = false;

    return setDataAttribute(loaderElement, 'data-visible', show);
}