<?php
// Include the database connection script
include 'dbConnection.php';

try {
    // PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch graphData (all rows)
    $fetchGraphDataQuery = "SELECT Time, Temperature, Pressure, Altitude, Longitude, Latitude FROM sensor_data";
    $graphDataResult = $pdo->query($fetchGraphDataQuery);

    // Fetch latest values for the other parameters
    $fetchLatestValuesQuery = "SELECT * FROM sensor_data ORDER BY Time DESC LIMIT 1";
    $latestValuesResult = $pdo->query($fetchLatestValuesQuery);

    if ($graphDataResult && $latestValuesResult) {
        $graphData = $graphDataResult->fetchAll(PDO::FETCH_ASSOC);
        $latestValues = $latestValuesResult->fetch(PDO::FETCH_ASSOC);

        // Convert Time values to float
        foreach ($graphData as &$row) {
            $row['Time'] = (float)$row['Time'];
        }

        // Combine graphData and latestValues into a single array
        $combinedData = [
            "graphData" => $graphData,
            "latestValues" => $latestValues
        ];

        // Send a JSON header
        header('Content-Type: application/json');

        // Output the JSON-encoded combinedData
        echo json_encode($combinedData);
    } else {
        // Send a JSON header
        header('Content-Type: application/json');

        // Output an error message
        echo json_encode(["error" => "Unable to fetch data"]);
    }
} catch (PDOException $e) {
    // Send a JSON header
    header('Content-Type: application/json');

    // Output an error message
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>
