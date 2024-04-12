<?php
include 'dbConnection.php';

function fetchAvailableTables($pdo) {
    try {
        $stmt = $pdo->query("SHOW TABLES LIKE 'sensor_data_%'");
        return $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
    } catch (PDOException $e) {
        return ["error" => "Failed to fetch tables: " . $e->getMessage()];
    }
}

$selectedTable = isset($_GET['tableName']) ? $_GET['tableName'] : 'sensor_data';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $availableTables = fetchAvailableTables($pdo);
    if (!in_array($selectedTable, $availableTables)) {
        $selectedTable = 'sensor_data';
    }

    // Assume 'id' is an auto-increment primary key
    $fetchGraphDataQuery = "SELECT Time, Temperature, Pressure, Altitude, Longitude, Latitude FROM $selectedTable";
    $graphDataResult = $pdo->query($fetchGraphDataQuery);

    $fetchLatestValuesQuery = "SELECT * FROM $selectedTable ORDER BY id DESC LIMIT 1"; // Changed from Time to id
    $latestValuesResult = $pdo->query($fetchLatestValuesQuery);

    if ($graphDataResult && $latestValuesResult) {
        $graphData = $graphDataResult->fetchAll(PDO::FETCH_ASSOC);
        $latestValues = $latestValuesResult->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            "graphData" => $graphData,
            "latestValues" => $latestValues,
            "tables" => $availableTables
        ]);
    } else {
        echo json_encode(["error" => "No data found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>
