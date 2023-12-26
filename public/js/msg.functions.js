function msgManager(show, title, desc, closable = true) {
    const msgContainerElement = document.querySelector("#msg-container");

    if (!msgContainerElement || msgContainerElement === undefined || msgContainerElement === null)
        return false;
    if (show === undefined || show === null)
        return false;
    if ((!title || title === undefined || title === null) && show)
        return false;
    if ((!desc || desc === undefined || desc === null) && show)
        return false;
    if (closable === undefined || closable === null)
        closable = true;

    if (show) {
        msgContainerElement.querySelector('#msg-title').innerHTML = title;
        msgContainerElement.querySelector('#msg-desc').innerHTML = desc;
        if (setDataAttribute(msgContainerElement, 'data-closable', closable))
            return setDataAttribute(msgContainerElement, 'data-visible', true);
        return false;
    } else {
        return setDataAttribute(msgContainerElement, 'data-visible', false);
    }
}