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
  <link rel="stylesheet" type="text/css" href="css/dataset.css">
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
        
<div id="table-selection">
    <label for="table-selector">Select Data Set:</label>
    <select id="table-selector">
        <option value="">Select a data set</option>
        <!-- Options will be added by JavaScript -->
    </select>
</div>
        
    </div>
    <script src="js/charts.js"></script>
    <script>
    $(document).ready(function () {
        var selectedTable = 'sensor_data'; // default table
    
        // Function to fetch data
        function fetchData(tableName) {
            $.ajax({
                url: 'database/fetchData.php',
                type: 'GET',
                data: { tableName: tableName },
                dataType: 'json',
                success: function (data) {
                    console.log('Data received:', data);
                    if (data.error) {
                        console.error('Error fetching data:', data.error);
                    } else {
                        onDataFetched(data);
                        if (data.tables && data.tables.length > 0) {
                            updateTableDropdown(data.tables, tableName);
                        } else {
                            console.error('No tables available');
                        }
                    }
                },
                error: function (xhr, status, error) {
                    console.error('AJAX error:', error);
                }
            });
        }
    
        // Update dropdown and set selected table
        function updateTableDropdown(tables, currentTable) {
            const selector = $('#table-selector');
            selector.empty();
            // Always add the default table first with special labeling
            selector.append(`<option value="sensor_data" ${'sensor_data' === currentTable ? 'selected' : ''}>Latest Data</option>`);
            tables.forEach(table => {
                if (table !== 'sensor_data') { // Avoid duplicating the default table entry
                    const formattedName = formatTableName(table);
                    selector.append(`<option value="${table}" ${table === currentTable ? 'selected' : ''}>${formattedName}</option>`);
                }
            });
        }
    
        $('#table-selector').change(function () {
            selectedTable = $(this).val();
            fetchData(selectedTable);
        });
    
        // Initial fetch
        fetchData(selectedTable);
    
        // Set interval to refresh data every 200ms
        setInterval(function () {
            fetchData(selectedTable);
        }, 500);
    
        function formatTableName(tableName) {
            if (tableName === 'sensor_data') {
                return 'Latest Data'; // Special label for the default table
            }
            const epochTime = tableName.split('_').pop();
            const date = new Date(parseInt(epochTime) * 1000);
            return `${tableName} (${date.toLocaleDateString()} ${date.toLocaleTimeString()})`;
        }
    });
    </script>   

</body>

</html>
