<!DOCTYPE html>
<html>
  <head>
    <title>Vila2Sat Dashboard</title>
    <meta charset="UTF-8">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" type="text/css" href="css/status.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
<?php include 'navbar.php'; ?>
    <div class="title">
      <h3 class="child">System Status</h3>
    </div>
    <hr>
    <div class="container">
      <div class="blockContainer">
        <div class="specialBlock" id="sysBlock">
          <div class="subSpecialBlock">
            <h3>System: </h3>
            <h4 class="mainStatusblock" id="sysStatusText">Offline</h4>
          </div>
          <div class="subSpecialBlock">
            <h3>Seeds: </h3>
            <h4 class="mainStatusblock" id="seedsStatusText">Undeployed</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="title">
      <h3 class="child">Components Status</h3>
    </div>
    <hr>
    <div class="container">
      <div class="blockContainer">
      
        <div class="block" id="bmpBlock">
          <div class="blockTitle">
            <h3 id="bmpMainStatusText">BMP-280</h3>
            <h4 class="statusblock" id="bmpStatusText">Offline</h4>
          </div>
          <div class="blockBody">
            <hr>
            <h4 id="bmpTemp">Tempreature: --</h4>
            <h4 id="bmpPressure">Pressure: --</h4>
            <h4 id="bmpAltitude">Altitude: --</h4>
          </div>
        </div>
        
        <div class="block" id="gpsBlock">
          <div class="blockTitle">
            <h3 id="gpsMainStatusText">GPS</h3>
            <h4 class="statusblock" id="gpsStatusText">Offline</h4>
          </div>
          <div class="blockBody">
            <hr>
            <h4 id="gpsLat">Latitude: --</h4>
            <h4 id="gpsLong">Longitude: --</h4>
            <h4 id="gpsAltitude">Altitude: --</h4>
          </div>
          <div class="blockFooter automargin">
            <hr>
            <h4 id="gpsSats">Satallites: --</h4>
          </div>
        </div>
        
        <div class="block" id="gyroBlock">
          <div class="blockTitle">
            <h3 id="gyroMainStatusText">GYRO</h3>
            <h4 class="statusblock" id="gyroStatusText">Offline</h4>
          </div>
          <div class="blockBody">
            <hr>
            <h4 id="gyro_x">Gyro X: --</h4>
            <h4 id="gyro_y">Gyro Y: --</h4>
            <h4 id="gyro_z">Gyro Z: --</h4>
          </div>
          <div class="blockFooter automargin">
            <hr>
            <h4 id="gyro_temp">Tempreature: --</h4>
          </div>
        </div>
        
        <div class="block" id="apcBlock">
          <div class="blockTitle">
            <h3 id="apcMainStatusText">APC220</h3>
            <h4 class="statusblock" id="apcStatusText">Offline</h4>
          </div>
          <div class="blockBody">
            <hr>
            <h4 id="apcAdditionalInfo">No Additional Info</h4>
          </div>
        </div>
        
        <div class="block" id="servoBlock">
          <div class="blockTitle">
            <h3 id="servoMainStatusText">Servo</h3>
            <h4 class="statusblock" id="servoStatusText">Offline</h4>
          </div>
          <div class="blockBody">
            <hr>
            <h4 id="servoRotation">Rotation: --</h4>
          </div>
        </div>
        
        <div class="block" id="sdBlock">
          <div class="blockTitle">
            <h3 id="servoMainStatusText">SD Card</h3>
            <h4 class="statusblock" id="sdStatusText">Offline</h4>
          </div>
          
          <div class="blockBody">
            <hr>
            <h4 id="sdAdditionalInfo">No Additional Info</h4>
          </div>
        </div>
      </div>
      
      <div class="errorContainer">
        <div class="error" id="errorBlock">
          <p id="sysText">All components are offline, system status will be showen as offline!</p>
        </div>
      </div>
      
    </div>
    <script src="js/status.js"></script>
    <script>
        
        $(document).ready(function () {
            function fetchData() {
                $.ajax({
                    url: 'database/fetchData.php',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        // Update the data-container with the fetched data
                        $('#data-container').html(JSON.stringify(data));
                        
                        // Call a function in your external script with the fetched data
                        if (typeof onDataFetched === 'function') {
                            onDataFetched(data);
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error fetching data:', error);
                    }
                });
            }

            // Fetch data every 200 milliseconds
            setInterval(fetchData, 500);
        });
        
    </script>
  </body>
</html>
