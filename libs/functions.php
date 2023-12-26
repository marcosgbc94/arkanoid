<?php

function getPlayerList($playerAlias = null) {
    global $conn;
    
    $consult = "
        SELECT 
            alias,
            points
        FROM
            player
        WHERE
            active = 1
    ";

    if (!is_null($playerAlias) && !empty($playerAlias)) {
        $consult .= " AND alias LIKE '%{$playerAlias}%' ";
    }

    $consult .= " ORDER BY points DESC ";

    $result = $conn->query($consult);
    
    $count = 0;
    while ($row = $result->fetch_assoc()) {
        $rows[$count]['alias'] = $row['alias'];
        $rows[$count]['points'] = $row['points'];
        $count++;
    }

    return $rows;
}

?>