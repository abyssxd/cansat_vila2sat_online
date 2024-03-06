function showTemp() {
    document.getElementById("temperature").style.display = "block";
    document.getElementById("pressure").style.display = "none";
    document.getElementById("altitude").style.display = "none";
    document.getElementById("velocity").style.display = "none";
    document.getElementById("temp_png").style.display = "block";
    document.getElementById("pressure_png").style.display = "none";
    document.getElementById("altitude_png").style.display = "none";
    document.getElementById("velocity_png").style.display = "none";
    document.getElementById("tempchart").style.display= "block";
    document.getElementById("preschart").style.display= "none";
    document.getElementById("altichart").style.display= "none";
    document.getElementById("velochart").style.display= "none";
}

function showPressure() {
    document.getElementById("temperature").style.display = "none";
    document.getElementById("pressure").style.display = "block";
    document.getElementById("altitude").style.display = "none";
    document.getElementById("velocity").style.display = "none";
    document.getElementById("temp_png").style.display = "none";
    document.getElementById("tempchart").style.display= "none";
    document.getElementById("pressure_png").style.display = "block";
    document.getElementById("altitude_png").style.display = "none";
    document.getElementById("velocity_png").style.display = "none";
    document.getElementById("preschart").style.display= "block";
    document.getElementById("altichart").style.display= "none";
    document.getElementById("velochart").style.display= "none";
}

function showAltitude() {
    document.getElementById("temperature").style.display = "none";
    document.getElementById("pressure").style.display = "none";
    document.getElementById("altitude").style.display = "block";
    document.getElementById("velocity").style.display = "none";
    document.getElementById("temp_png").style.display = "none";
    document.getElementById("tempchart").style.display= "none";
    document.getElementById("pressure_png").style.display = "none";
    document.getElementById("altitude_png").style.display = "block";
    document.getElementById("velocity_png").style.display = "none";
    document.getElementById("preschart").style.display= "none";
    document.getElementById("altichart").style.display= "block";
    document.getElementById("velochart").style.display= "none";
}

function showVelocity() {
    document.getElementById("temperature").style.display = "none";
    document.getElementById("pressure").style.display = "none";
    document.getElementById("altitude").style.display = "none";
    document.getElementById("velocity").style.display = "block";
    document.getElementById("temp_png").style.display = "none";
    document.getElementById("tempchart").style.display= "none";
    document.getElementById("pressure_png").style.display = "none";
    document.getElementById("altitude_png").style.display = "none";
    document.getElementById("velocity_png").style.display = "block";
    document.getElementById("preschart").style.display= "none";
    document.getElementById("altichart").style.display= "none";
    document.getElementById("velochart").style.display= "block";
}


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

//Fetch Data ----- END


// Define a function to handle the fetched data
function onDataFetched(data) {
        var graphData = data.graphData;
        console.log('Graph Data:', graphData);
    // Check if both graphData and latestValues are present in the fetched data
    if ("graphData" in data && "latestValues" in data) {
        // Handle graphData (all rows)


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

    } else {
        console.error('Invalid data format:', data);
    }
}

//Fetch Data ----- END


//end of dom loaded

//Fuction to update the chart data with the data provided in the ws.onmessage event.
function updateChartData(chart, labels, data) {
    chart.data.labels = labels;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.update();
}

