// Map Related code using Leaftlet Map ----- START
const mapElement = document.getElementById('map');
const map = L.map(mapElement).setView([0, 0], 30);

//Credits are important.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker; //The variable that stores the marker for the GPS marker
let userLocationMarker; //The variable that stores the marker for the user marker
let userLocationCircle; // The variable to show a circle that shows the accuracy radius

const userIcon = L.icon({
    iconUrl: 'map_dot.png', // Provide the path to your blue dot icon image
    iconSize: [17, 17], // This can be the actual size of your icon
    iconAnchor: [8, 8] // Adjust as needed to center the icon
});

if ("geolocation" in navigator) { //Check if the browser has geolocation support
    navigator.geolocation.watchPosition(function(position) { //Watch the live position of the user
        const userLat = position.coords.latitude; //Define & store the device latitude in the userLat variable
        const userLng = position.coords.longitude; //Define & store the device longitude in the userLng variable
        const accuracy = position.coords.accuracy; //Define & store the location accuracy in the accuracy variable

        if (userLocationMarker) { //If the user location marker already exists, then update it
            userLocationMarker.setLatLng([userLat, userLng]); //Set the latitude and longitude for the user marker
            userLocationCircle.setLatLng([userLat, userLng]); //Set the latitude and longitude for the circle
            userLocationCircle.setRadius(accuracy); //Set the circle radius according to the location accuracy
        } else { //If the user location marker doesn't already exist
            userLocationMarker = L.marker([userLat, userLng], { icon: userIcon }).addTo(map);
            userLocationMarker.bindPopup("Your location"); //Add a popup to the user location marker to avoid confusion, was initially added before I changed the marker to a circle icon.
            userLocationCircle = L.circle([userLat, userLng], { //The accuracy radius circle
                color: 'blue',
                fillColor: '#cacaca',
                fillOpacity: 0.5,
                radius: accuracy
            }).addTo(map); //Adds the circle to the map ofc, if you don't know that then why're you even checking this file
        }

    }, function(error) {
        console.error("Error occurred while watching location: ", error);
    }, {
        //This will make sure the location given is the actual location and not a previously cached location
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 27000
    });
} else {
    console.log("Geolocation is not supported by this browser."); //oh no! an error!
}
// Map Related code ----- END

// Created Charts ----- START





//Create the tempreature chart using chart.js and assign it to the div with the temperature ID.
// Define the plugin
var imageBG = {
    beforeDraw: function(chartInstance) {
        var ctx = chartInstance.ctx;
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chartInstance.width, chartInstance.height);
        ctx.restore();
    }
};

// Get the chart element
const tempChartElement = document.getElementById('temperature').getContext('2d');

// Create the chart with the plugin
const tempChart = new Chart(tempChartElement, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature',
            data: [],
            backgroundColor: 'rgba(237, 125, 49, 0.5)',
            borderColor: 'rgba(237, 125, 49, 1)',
            borderWidth: 1,
            pointRadius: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false //Don't begin the chart at 0
            }
        },
        animation: {
            duration: 0, //Cancel the animation because it looks weird when this chart updates literally every second
        }
    },
    plugins: [imageBG] // Add a white background for when the chart's image is created
});


//Create the altitude chart using chart.js and assign it to the div with the altitude ID.
const altitudeChartElement = document.getElementById('altitude').getContext('2d');
const altitudeChart = new Chart(altitudeChartElement, {
    type: 'line', //Type of chart
    data: {
        labels: [],
        datasets: [{
            label: 'Altitude', //The label of the chart
            data: [],
            backgroundColor: 'rgba(106, 90, 205, 0.5)',
            borderColor: 'rgba(106, 90, 205, 1)',
            borderWidth: 1,
            pointRadius: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false //Don't begin the chart at 0
            }
        },
        animation: {
            duration: 0, //Cancel the animation because it looks weird when this chart updates literally every second
        }
    },
    plugins: [imageBG] // Add a white background for when the chart's image is created
});

//Create the pressure chart using chart.js and assign it to the div with the pressure ID.
const pressureChartElement = document.getElementById('pressure').getContext('2d');
const pressureChart = new Chart(pressureChartElement, {
    type: 'line', //Type of chart
    data: {
        labels: [],
        datasets: [{
            label: 'Pressure', //The label of the chart
            data: [],
            backgroundColor: 'rgba(112, 173, 71, 0.5)',
            borderColor: 'rgba(112, 173, 71, 1)',
            borderWidth: 1,
            pointRadius: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false //Don't begin the chart at 0
            }
        },
        animation: {
            duration: 0, //Cancel the animation because it looks weird when this chart updates literally every second
        }
    },
    plugins: [imageBG] // Add a white background for when the chart's image is created
});


//Create the velocity chart using chart.js and assign it to the div with the velocity ID.
const velocityChartElement = document.getElementById('velocity').getContext('2d');
const velocityChart = new Chart(velocityChartElement, {
    type: 'line', //Type of chart
    data: {
        labels: [],
        datasets: [{
            label: 'Velocity', //The label of the chart
            data: [],
            backgroundColor: 'rgba(220, 20, 60, 0.5)',
            borderColor: 'rgba(220, 20, 60, 1)',
            borderWidth: 1,
            pointRadius: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false //Don't begin the chart at 0
            }
        },
        animation: {
            duration: 0, //Cancel the animation because it looks weird when this chart updates literally every second
        }
    },
    plugins: [imageBG] // Add a white background for when the chart's image is created
});
// Created Charts ----- END

function downloadChart(chart, fileName) {
    // Save original sizes
    var originalSize = {
        width: chart.width,
        height: chart.height
    };

    // Temporarily resize chart to desired download size
    chart.resize(1920, 1080); // for a 16:9 aspect ratio

    // Trigger download after resize
    chart.update({
        duration: 0 // Update instantly
    }, true); // Pass `true` as the second argument to make the resize happen immediately

    // Create a temporary link for the download
    var downloadLink = document.createElement('a');
    downloadLink.href = chart.toBase64Image();
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink); // Needed for Firefox
    downloadLink.click();
    document.body.removeChild(downloadLink); // Clean up

    // Restore original chart sizes
    chart.resize(originalSize.width, originalSize.height);
    chart.update({
        duration: 0
    });
}


//Chart downloads
const tempChartDownloadPNG = document.getElementById("temp_png");
tempChartDownloadPNG.addEventListener('click', function() {
    downloadChart(tempChart, 'tempChart.png');
});

const pressureChartDownloadPNG = document.getElementById("pressure_png");
pressureChartDownloadPNG.addEventListener('click', function() {
    downloadChart(pressureChart, 'pressureChart.png');
});

const altitudeChartDownloadPNG = document.getElementById("altitude_png");
altitudeChartDownloadPNG.addEventListener('click', function() {
    downloadChart(altitudeChart, 'altitudeChart.png');
});

const velocityChartDownloadPNG = document.getElementById("velocity_png");
velocityChartDownloadPNG.addEventListener('click', function() {
    downloadChart(velocityChart, 'velocityChart.png');
});

function downloadChart(chart, fileName) {
    // Save original sizes
    var originalSize = {
        width: chart.width,
        height: chart.height
    };

    // Temporarily resize chart to desired download size
    chart.resize(1920, 1080); // for a 16:9 aspect ratio

    // Trigger download after resize
    chart.update({
        duration: 0 // Update instantly
    }, true); // Pass `true` as the second argument to make the resize happen immediately

    // Create a temporary link for the download
    var downloadLink = document.createElement('a');
    downloadLink.href = chart.toBase64Image();
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink); // Needed for Firefox
    downloadLink.click();
    document.body.removeChild(downloadLink); // Clean up

    // Restore original chart sizes
    chart.resize(originalSize.width, originalSize.height);
    chart.update({
        duration: 0
    });
}


//Fetch Data ----- END
// Define a function to handle the fetched data
function onDataFetched(data) {
    // Check if both graphData and latestValues are present in the fetched data
    if ("graphData" in data && "latestValues" in data) {
        // Handle graphData (all rows)
        var graphData = data.graphData;
        console.log('Graph Data:', graphData);

        // Handle latestValues (latest values for other parameters)
        var latestValues = data.latestValues;
        console.log('Latest Values:', latestValues);

        // Your logic to process and use the graphData and latestValues
        // Example: Access specific properties of the graphData and latestValues
        var firstGraphDataRow = graphData[0];
        console.log('First Graph Data Row:', firstGraphDataRow);

        var latestTemperature = latestValues.Temperature;
        console.log('Latest Temperature:', latestTemperature);

        //examples end

        // Add the time from the graphData to the time variable
        const time = graphData.map(row => row.Time);

        // Update temperature chart
        const tempData = graphData.map(row => row.Temperature);
        updateChartData(tempChart, time, tempData);

        // Update pressure chart
        const pressureData = graphData.map(row => row.Pressure);
        updateChartData(pressureChart, time, pressureData);

        // Update altitude chart
        const altitudeData = graphData.map(row => row.Altitude);
        updateChartData(altitudeChart, time, altitudeData);

        // Function to calculate Velocity
        function calculateVelocity() {
            let velocities = [];

            for (let i = 1; i < graphData.length; i++) {
                let deltaTime = graphData[i].Time - graphData[i - 1].Time;
                let deltaAltitude = graphData[i].Altitude - graphData[i - 1].Altitude;

                // Avoid division by zero
                if (deltaTime !== 0) {
                    velocities.push(deltaAltitude / deltaTime);
                } else {
                    velocities.push(0);
                }
            }
            return velocities;
        }

        const velocities = calculateVelocity();
        updateChartData(velocityChart, time.slice(1), velocities); // Adjust time to match velocities array

        const latitude = latestValues.Latitude;
        const longitude = latestValues.Longitude;

        if (!isNaN(latitude) && !isNaN(longitude)) {
            if (marker) {
                marker.setLatLng([latitude, longitude]);
            } else {
                marker = L.marker([latitude, longitude]).addTo(map);
            }
            map.setView([latitude, longitude], 30);
        }
    } else {
        console.error('Invalid data format:', data);
    }
}

//Fetch Data ----- END


//Fuction to update the chart data with the data provided in the ws.onmessage event.
function updateChartData(chart, labels, data) {
    chart.data.labels = labels;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.update();
}