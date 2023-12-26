/**
 * Obtiene el valor de un atributo data de un elemento del DOM dado
 * @param {Element} element Elemento del DOM
 * @param {String} data Nombre del atributo data del elemento
 * @param {Boolean} validate Si es necesario validar los parámetros anteriores
 * @returns {Boolean|String}
 */
function getDataAttribute(element, data, validate = true) {
    if (validate) {
        if (!element || element === undefined || element === null)
            return false;
        if (!data || data === undefined || data === null)
            return false;
    }

    return element.getAttribute(data);
}

/**
 * Establece el valor de un atributo data de un elemento del DOM dado
 * @param {Element} element Elemento del DOM
 * @param {String} data Nombre del atributo data del elemento
 * @param {*} value Valor del atributo data del elemento
 * @param {Boolean} validate Si es necesario validar los parámetros anteriores
 * @returns {Boolean}
 */
function setDataAttribute(element, data, value, validate = true) {
    if (validate) {
        if (!element || element === undefined || element === null)
            return false;
        if (!data || data === undefined || data === null)
            return false;
        if (value === undefined || value === null)
            value = "";
    }

    element.setAttribute(data, value.toString());

    if (value.toString() == getDataAttribute(element, data, false)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Obtiene la ruta absoluta de una determinada página
 * @param {String} page Nombre de la página a cargar
 * @param {String} ext Extención de la página a cargar
 * @returns {Boolean|String}
 */
function getURLPage(page, ext = 'php') {
    if (!page || page === undefined || page === null)
        return false;
    if (!ext || ext === undefined || ext === null)
        ext = 'php';

    let path = null;
    const pathAbsolute = window.location.href;

    switch (page) {
        case 'game':
            path =  `${pathAbsolute}game.${ext}`;
            break;
        case 'ranking':
            path =  `${pathAbsolute}ranking.${ext}`;
            break;
    }

    return path;
}

/**
 * Obtiene el estilo de un elemento del DOM
 * @param {Element} element Elemento a obtener estilo
 * @param {String} style Nombre del estilo a obtener
 * @returns {null|string}
 */
function getStyleFromElement(element, style) {
    if (element === undefined || element === null)
        return null;
    if (style === undefined || style === null)
        return null;

    return element.style[style] || null;
}

/**
 * Establece el estilo de un elemento del DOM
 * @param {Element} element Elemento a establecer estilo
 * @param {String} style Nombre del estilo a establecer
 * @param {String} value Valor del estilo a establecer
 * @returns {null|boolean}
 */
function setStyleToElement(element, style, value) {
    if (element === undefined || element === null)
        return null;
    if (style === undefined || style === null)
        return null;
    if (value === undefined || value === null)
        return null;

    element.style[style] = value;

    if (getStyleFromElement(element, style) === value)
        return true;

    return false;
}

/**
 * Obtiene el valor de una variable CSS
 * @param {String} variable Nombre de la variable CSS a encontrar
 * @returns {null|String}
 */
function getCSSvariable(variable) {
    if (variable === undefined || variable === null)
        return null;

    const variableValue = window.getComputedStyle(document.documentElement).getPropertyValue(variable);

    return variableValue;
}

/**
 * Establece el valor de una variable CSS
 * @param {String} variable Nombre de la variable CSS a encontrar
 * @param {String|Number} value Valor a establecer en la variable CSS
 * @returns {null|boolean}
 */
function setCSSvariable(variable, value) {
    if (variable === undefined || variable === null)
        return null;
    if (value === undefined || value === null)
        return null;

    document.documentElement.style.setProperty(variable, value);

    const variableValue = getCSSvariable(variable);

    if (variableValue === value)
        return true;

    return false;
}

function hasDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true;
    }

    return false;
}

function getGameLevel(level) {
    if (!level || level === undefined || level === null)
        return null;

    try {
        const request = new XMLHttpRequest();
        request.open('POST', `./src/levels/level_${level}.json`, false);
        request.send(null);
        if (request.status !== 200) {
            return  false;
        }

        return JSON.parse(request.responseText);
    } catch (error) {
        return false;
    }
}