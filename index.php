<?php
    
    
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arkanoid</title>
    <link rel="stylesheet" href="./public/css/style.css">
    <link rel="stylesheet" href="./public/css/loader.style.css">
    <link rel="stylesheet" href="./public/css/msg.style.css">
    <link rel="stylesheet" href="./public/css/app.style.css">
    <link rel="stylesheet" href="./public/css/index.style.css">
</head>
<body>
    <?php
        include_once "./views/loader.php";
        include_once "./views/msg.php";
    ?>

    <!-- APP -->
    <div id="app">
        <div id="presentation-container">
            <h1 id="presentation-title">Arkanoid</h1>
            <div id="presentation-actions-container">
                <button type="button" id="presentation-play-button" title="Jugar al juego">Play</button>
                <button type="button" id="presentation-ranking-button" title="Ver mejores jugadores">Ranking</button>
            </div>
        </div>
    </div>

    <script src="./public/js/utils.js"></script>
    <script src="./public/js/functions.js"></script>
    <script src="./public/js/loader.functions.js"></script>
    <script src="./public/js/msg.functions.js"></script>
    <script src="./public/js/index.functions.js"></script>
</body>
</html>