<?php
include_once "./libs/connection.php";
include_once "./libs/functions.php";

$playersListRanking = getPlayerList();
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arkanoid: Ranking</title>
    <link rel="stylesheet" href="./public/css/style.css">
    <link rel="stylesheet" href="./public/css/loader.style.css">
    <link rel="stylesheet" href="./public/css/msg.style.css">
    <link rel="stylesheet" href="./public/css/app.style.css">
    <link rel="stylesheet" href="./public/css/ranking.style.css">
</head>

<body>
    <?php
    include_once "./views/loader.php";
    include_once "./views/msg.php";
    ?>

    <!-- APP -->
    <div id="app">
        <div id="ranking-container">
            <table id="ranking-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jugador</th>
                        <th>Puntaje</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    foreach ($playersListRanking as $index => $player) {
                    ?>
                        <tr>
                            <th><?= ($index + 1) ?></th>
                            <th><?= $player['alias'] ?></th>
                            <th><?= $player['points'] ?></th>
                        </tr>
                    <?php
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    <script src="./public/js/utils.js"></script>
    <script src="./public/js/functions.js"></script>
    <script src="./public/js/loader.functions.js"></script>
    <script src="./public/js/msg.functions.js"></script>
    <script src="./public/js/ranking.functions.js"></script>
</body>

</html>