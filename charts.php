<!DOCTYPE html>
<html>

<head>
    <title>Vila2Sat Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" type="text/css" href="css/charts.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>

<body onload="showTemp()">

<?php include 'navbar.php'; ?>


    <div class="title">
        <a class="temp_show" onclick="showTemp()">Tempreature</a><a class="pressure_show" onclick="showPressure()">Pressure</a><a class="altitude_show" onclick="showAltitude()">Altitude</a><a class="velocity_show" onclick="showVelocity()">Velocity</a>
    </div>
    <hr>

    <div class="container">
        <div class="chartContainer">

            <div id="tempchart" class="chart">
                <canvas id="temperature"></canvas>
                <div class="download temperature">
                    <a id="temp_png">Download Chart Image</a>
                </div>
            </div>

            <div id="preschart" class="chart">
                <canvas id="pressure"></canvas>
                <div class="download pressure">
                    <a id="pressure_png">Download Chart Image</a>
                </div>
            </div>

            <div id="altichart" class="chart">
                <canvas id="altitude"></canvas>
                <div class="download altitude">
                    <a id="altitude_png">Download Chart Image</a>
                </div>
            </div>


            <div id="velochart" class="chart">
                <canvas id="velocity"></canvas>
                <div class="download velocity">
                    <a id="velocity_png">Download Chart Image</a>
                </div>
            </div>

        </div>
    </div>
    <script src="js/charts.js"></script>
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
            setInterval(fetchData, 2000);
        });
    </script>   

</body>

</html>
