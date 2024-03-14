<?php
// Database configuration
$host = "localhost";
$dbname = "pogmcnet_cansat";
$username = "pogmcnet_cansat";
$password = "fakePassword123";

// PDO connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    #echo "Connected successfully";

    // Create table if not exists
    $createTableQuery = "
        CREATE TABLE IF NOT EXISTS sensor_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            Time VARCHAR(255),
            Temperature DOUBLE,
            Pressure DOUBLE,
            Altitude DOUBLE,
            Latitude DOUBLE,
            Longitude DOUBLE,
            gps_altitude DOUBLE,
            gps_sats INT,
            gyro_x DOUBLE,
            gyro_y DOUBLE,
            gyro_z DOUBLE,
            gyro_acc_x DOUBLE,
            gyro_acc_y DOUBLE,
            gyro_acc_z DOUBLE,
            gyro_temp DOUBLE,
            bmp_status INT,
            gps_status INT,
            gyro_status INT,
            apc_status INT,
            servo_status INT,
            servo_rotation DOUBLE,
            sd_status INT
        )
    ";

    $pdo->exec($createTableQuery);
    #echo "\nTable created successfully (if not exists)";
} catch (PDOException $e) {
    #echo "Connection failed: " . $e->getMessage();
}
?>
