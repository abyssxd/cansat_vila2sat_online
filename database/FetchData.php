<?php
// Include the database connection script
include 'dbConnection.php';

// Function to fetch available tables
function fetchAvailableTables($pdo) {
    try {
        $stmt = $pdo->query("SHOW TABLES LIKE 'sensor_data_%'");
        return $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
    } catch (PDOException $e) {
        return [];
    }
}

// Get the selected table name from the AJAX request
$selectedTable = isset($_GET['tableName']) ? $_GET['tableName'] : 'sensor_data'; // Default table if none specified

try {
    // PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Ensure the selected table exists
    $availableTables = fetchAvailableTables($pdo);
    if (!in_array($selectedTable, $availableTables)) {
        // If the selected table does not exist in the list, use the default 'sensor_data'
        $selectedTable = 'sensor_data';
    }

    // Fetch graphData (all rows)
    $fetchGraphDataQuery = "SELECT Time, Temperature, Pressure, Altitude, Longitude, Latitude FROM $selectedTable";
    $graphDataResult = $pdo->query($fetchGraphDataQuery);

    // Fetch latest values for the other parameters
    $fetchLatestValuesQuery = "SELECT * FROM $selectedTable ORDER BY Time DESC LIMIT 1";
    $latestValuesResult = $pdo->query($fetchLatestValuesQuery);

    if ($graphDataResult && $latestValuesResult) {
        $graphData = $graphDataResult->fetchAll(PDO::FETCH_ASSOC);
        $latestValues = $latestValuesResult->fetch(PDO::FETCH_ASSOC);

        // Combine graphData and latestValues into a single array
        $combinedData = [
            "graphData" => $graphData,
            "latestValues" => $latestValues,
            "tables" => $availableTables
        ];

        // Send a JSON header
        header('Content-Type: application/json');

        // Output the JSON-encoded combinedData
        echo json_encode($combinedData);
    } else {
        echo json_encode(["error" => "Unable to fetch data"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>
