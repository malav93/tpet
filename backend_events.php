<?php
require_once '_db.php';
    
$result = $db->query('SELECT * FROM events');

class Event {}
$events = array();

date_default_timezone_set("UTC");
$now = new DateTime("now");
$today = $now->setTime(0, 0, 0);

foreach($result as $row) {
    $row['start'] = str_replace(' ','T',$row['start']);
    $row['end'] = str_replace(' ','T',$row['end']);
    $e = new Event();
    $e->id = $row['id'];
    $e->text = $row['text'];
    $e->start = $row['start'];
    $e->end = $row['end'];
    $events[] = $e;
}

header('Content-Type: application/json');
echo json_encode($events);

?>
