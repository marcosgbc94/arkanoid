/* INDEX */

window.addEventListener('load', () => {
    const presentationPlayButton = document.querySelector('#presentation-play-button');
    const presentationRankingButton = document.querySelector('#presentation-ranking-button');
    if (presentationPlayButton && presentationRankingButton) {
        presentationPlayButton.addEventListener('click', () => {
            const path = getURLPage('game');
            
            if (path) {
                window.location.href = path;
                return true;
            }
        
            msgManager(true, 'Error al abrir página', 'No se logró abrir la página de Ranking por no encontrarse ruta.', true);
        });

        presentationRankingButton.addEventListener('click', () => {
            const path = getURLPage('ranking');
            
            if (path) {
                window.location.href = path;
                return true;
            }
        
            msgManager(true, 'Error al abrir página', 'No se logró abrir la página de Ranking por no encontrarse ruta.', true);
        });
    } else {
        msgManager(true, 'Error', 'No se encontraron elementos en la página.', true);
    }
});