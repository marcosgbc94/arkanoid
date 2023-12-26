<?php
include_once "./libs/connection.php";
include_once "./libs/functions.php";

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
    <link rel="stylesheet" href="./public/css/game.style.css">
</head>

<body>
    <?php
    include_once "./views/loader.php";
    include_once "./views/msg.php";
    ?>

    <!-- APP -->
    <div id="app">
        <div id="info">
            <div id="info-desc">
                h
            </div>
            <div id="info-actions">
                5
            </div>
        </div>
        <canvas id="game"></canvas>
    </div>

    <script src="./public/js/utils.js"></script>
    <script src="./public/js/functions.js"></script>
    <script src="./public/js/loader.functions.js"></script>
    <script src="./public/js/msg.functions.js"></script>
    <script src="./public/js/game.config.js"></script>
    <script src="./public/js/game.functions.js"></script>
</body>

</html>