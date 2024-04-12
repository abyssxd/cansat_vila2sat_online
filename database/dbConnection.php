<?php
// Database configuration
$host = "localhost";
$dbname = "";
$username = "";
$password = "";

// PDO connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    #echo "Connected successfully";

    // Create table if not exists
    $createTableQuery = "
        CREATE TABLE IF NOT EXISTS sensor_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            Time FLOAT,
            Temperature FLOAT,
            Pressure FLOAT,
            Altitude FLOAT,
            Latitude FLOAT,
            Longitude FLOAT,
            gps_altitude FLOAT,
            gps_sats FLOAT,
            gyro_x FLOAT,
            gyro_y FLOAT,
            gyro_z FLOAT,
            gyro_acc_x FLOAT,
            gyro_acc_y FLOAT,
            gyro_acc_z FLOAT,
            gyro_temp FLOAT,
            bmp_status FLOAT,
            gps_status FLOAT,
            gyro_status FLOAT,
            apc_status FLOAT,
            servo_status FLOAT,
            servo_rotation FLOAT,
            sd_status FLOAT
        )
    ";

    $pdo->exec($createTableQuery);
    #echo "\nTable created successfully (if not exists)";
} catch (PDOException $e) {
    #echo "Connection failed: " . $e->getMessage();
}
?>
