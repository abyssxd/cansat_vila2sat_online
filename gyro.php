<!DOCTYPE html>
<html>

<head>
    <title>Vila2Sat Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" type="text/css" href="css/gyro.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>

<body>

<?php include 'navbar.php'; ?>


    <div class="title">
        <h1>Vila2Sat Gyroscope</h1>
    </div>
    <hr>

    <div class="container">

    <div id="cansatContainer"></div>


<div class="InfoSection">
    <div class="Infocontainer">
      <div class="blockContainer">
        <div class="block" id="sysBlock">
          <h4 id="sysStatusText">Gyroscope (DEG)</h4>
          <p id="gyroX">X: --</p>
          <p id="gyroY">Y: --</p>
          <p id="gyroZ">Z: --</p>
        </div>
      </div>
    </div>

        <div class="Infocontainer">
      <div class="blockContainer">
        <div class="block" id="sysBlock">
          <h4 id="sysStatusText">Accelerometer</h4>
          <p id="acceX">X: --</p>
          <p id="acceY">Y: --</p>
          <p id="acceZ">Z: --</p>
        </div>
      </div>
    </div>

        <div class="Infocontainer">
      <div class="blockContainer">
        <div class="block" id="sysBlock">
          <h4 id="sysStatusText">Other info</h4>
          <p id="gyroTemp">Tempreature: --</p>
        </div>
      </div>
    </div>
    </div>


    </div>
    <script type="module" src="js/gyro.js"></script>
    <script type="module">
        import { onDataFetched } from './js/gyro.js'; // Adjust the path accordingly
    
        $(document).ready(function () {
            function fetchData() {
                $.ajax({
                    url: 'database/fetchData.php',
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        // Call the imported function
                        onDataFetched(data);
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
