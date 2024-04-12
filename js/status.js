//TEST ---- START
/*
        bmp_status = 0;
        gps_status = 0;
        gyro_status = 0;
        apc_status = 0;
        servo_rotation= 90;
        sd_status= 0;
        servo_status = 0;
        gps_sats= 5;
        seeds_deployed = 0;


        bmp_temp = 25;
        bmp_pressure = 31;
        bmp_altitude = 63;

        
        gps_longitude = 41.382736;
        gps_latitude = 2.154902;
        gps_altitude = 25;

        gyro_x = 10;
        gyro_y = 10;
        gyro_z = 200;
        gyro_temp = 25;


        if (bmp_status != 1 && gps_status != 1 && gyro_status != 1 && apc_status != 1 && servo_status != 1 && sd_status != 1) {
        	system_status = 1;
            document.getElementById("errorBlock").style.display = "block";
        } else {
        	system_status = 0;
            document.getElementById("errorBlock").style.display = "none";
        }
        
        
        if (bmp_status != 1){
            document.getElementById("bmpStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("bmpStatusText").innerHTML = "Offline";
        }else{
            document.getElementById("bmpStatusText").style.backgroundColor = "#01e774";
            document.getElementById("bmpStatusText").innerHTML = "Online";
            document.getElementById("bmpTemp").innerHTML = "Tempreature: " + bmp_temp + " º";
            document.getElementById("bmpPressure").innerHTML = "Pressure: " + bmp_pressure + " Pa";
            document.getElementById("bmpAltitude").innerHTML = "Altitude: " + bmp_altitude + " m";
        }
        
        if (gps_status != 1){
            document.getElementById("gpsStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("gpsStatusText").innerHTML = "Offline";
        }else{
            document.getElementById("gpsStatusText").style.backgroundColor = "#01e774";
            document.getElementById("gpsStatusText").innerHTML = "Online";
            document.getElementById("gpsLat").innerHTML = "Latitude: " + gps_latitude;
            document.getElementById("gpsLong").innerHTML = "Longitude: " + gps_longitude;
            document.getElementById("gpsAltitude").innerHTML = "Altitude: " + gps_altitude + " m";
            document.getElementById("gpsSats").innerHTML = "Satallites: " + gps_sats;
        }
        
        if (gyro_status != 1){
            document.getElementById("gyroStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("gyroStatusText").innerHTML = "Offline";

        }else{
            document.getElementById("gyroStatusText").style.backgroundColor = "#01e774";
            document.getElementById("gyroStatusText").innerHTML = "Online";
            document.getElementById("gyro_x").innerHTML = "Gyro X: " + gyro_x + " rad/s";
            document.getElementById("gyro_y").innerHTML = "Gyro Y: " + gyro_y+ " rad/s";
            document.getElementById("gyro_z").innerHTML = "Gyro Z: " + gyro_z+ " rad/s";
            document.getElementById("gyro_temp").innerHTML = "Tempreature: " + gyro_temp+ " º";
        }
        
        if (apc_status != 1){
            document.getElementById("apcStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("apcStatusText").innerHTML = "Offline";
        }else {
            document.getElementById("apcStatusText").style.backgroundColor = "#01e774";
            document.getElementById("apcStatusText").innerHTML = "Online";
        }

        if (servo_status != 1){
            document.getElementById("servoStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("servoStatusText").innerHTML = "Offline";
        }else {
            document.getElementById("servoStatusText").style.backgroundColor = "#01e774";
            document.getElementById("servoStatusText").innerHTML = "Online";
            document.getElementById("servoRotation").innerHTML = "Rotation: " + servo_rotation+ " º";
        }

        if (sd_status != 1){
            document.getElementById("sdStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("sdStatusText").innerHTML = "Offline";
        }else {
            document.getElementById("sdStatusText").style.backgroundColor = "#01e774";
            document.getElementById("sdStatusText").innerHTML = "Online";
        }

        if (seeds_deployed != 1){
            document.getElementById("seedsStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("seedsStatusText").innerHTML = "Undeployed";
        }else {
            document.getElementById("seedsStatusText").style.backgroundColor = "#01e774";
            document.getElementById("seedsStatusText").innerHTML = "Deployed";
        }


        if(bmp_status == 1 && gps_status == 1 && gyro_status == 1 && apc_status == 1 && servo_status == 1 && sd_status == 1){
            document.getElementById("sysStatusText").innerHTML = "Online";
            document.getElementById("sysStatusText").style.backgroundColor = "#01e774";
        } else if (bmp_status == 1 || gps_status == 1 || gyro_status == 1 || apc_status == 1 || servo_status == 1 || sd_status == 1){
            document.getElementById("sysStatusText").innerHTML = "Partially Online";
            document.getElementById("sysStatusText").style.backgroundColor = "#ffd85c";
        } else {
            document.getElementById("sysStatusText").innerHTML = "Offline";
            document.getElementById("sysStatusText").style.backgroundColor = "#e24a4a";
        }

*/
//TEST ---- END



//Websocket connection ---- END


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
        

        gps_sats = latestValues.gps_sats;
        bmp_status = latestValues.bmp_status;
        gps_status = latestValues.gps_status;
        gyro_status = latestValues.gyro_status;
        apc_status = latestValues.apc_status;
        servo_status = latestValues.servo_status;
        servo_rotation = latestValues.servo_rotation;
        sd_status = latestValues.sd_status;
        seeds_deployed = latestValues.seeds_deployed;

        bmp_temp = latestValues.Tempreature;
        bmp_pressure = latestValues.Pressure;
        bmp_altitude = latestValues.Altitude;

        
        gps_longitude = latestValues.Longitude;
        gps_latitude = latestValues.Latitude;
        gps_altitude = latestValues.gps_altitude;

        gyro_x = latestValues.gyro_x;
        gyro_y = latestValues.gyro_y;
        gyro_z = latestValues.gyro_z;
        gyro_temp = latestValues.gyro_temp;


        if (bmp_status != 1 && gps_status != 1 && gyro_status != 1 && apc_status != 1 && servo_status != 1 && sd_status != 1) {
        	system_status = 1;
            document.getElementById("errorBlock").style.display = "block";
        } else {
        	system_status = 0;
            document.getElementById("errorBlock").style.display = "none";
        }
        
        
        if (bmp_status != 1){
            document.getElementById("bmpStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("bmpStatusText").innerHTML = "Offline";
        }else{
            document.getElementById("bmpStatusText").style.backgroundColor = "#01e774";
            document.getElementById("bmpStatusText").innerHTML = "Online";
            document.getElementById("bmpTemp").innerHTML = "Tempreature: " + latestTemperature + " º";
            console.log("Tempreature: " + bmp_temp);
            document.getElementById("bmpPressure").innerHTML = "Pressure: " + bmp_pressure + " Pa";
            document.getElementById("bmpAltitude").innerHTML = "Altitude: " + bmp_altitude + " m";
        }
        
        if (gps_status != 1){
            document.getElementById("gpsStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("gpsStatusText").innerHTML = "Offline";
        }else{
            document.getElementById("gpsStatusText").style.backgroundColor = "#01e774";
            document.getElementById("gpsStatusText").innerHTML = "Online";
            document.getElementById("gpsLat").innerHTML = "Latitude: " + gps_latitude;
            document.getElementById("gpsLong").innerHTML = "Longitude: " + gps_longitude;
            document.getElementById("gpsAltitude").innerHTML = "Altitude: " + gps_altitude + " m";
            document.getElementById("gpsSats").innerHTML = "Satallites: " + gps_sats;
        }
        
        if (gyro_status != 1){
            document.getElementById("gyroStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("gyroStatusText").innerHTML = "Offline";

        }else{
            document.getElementById("gyroStatusText").style.backgroundColor = "#01e774";
            document.getElementById("gyroStatusText").innerHTML = "Online";
            document.getElementById("gyro_x").innerHTML = "Gyro X: " + gyro_x + " rad/s";
            document.getElementById("gyro_y").innerHTML = "Gyro Y: " + gyro_y+ " rad/s";
            document.getElementById("gyro_z").innerHTML = "Gyro Z: " + gyro_z+ " rad/s";
        }
        
        if (apc_status != 1){
            document.getElementById("apcStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("apcStatusText").innerHTML = "Offline";
        }else {
            document.getElementById("apcStatusText").style.backgroundColor = "#01e774";
            document.getElementById("apcStatusText").innerHTML = "Online";
        }

        if (servo_status != 1){
            document.getElementById("servoStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("servoStatusText").innerHTML = "Offline";
        }else {
            document.getElementById("servoStatusText").style.backgroundColor = "#01e774";
            document.getElementById("servoStatusText").innerHTML = "Online";
            document.getElementById("servoRotation").innerHTML = "Rotation: " + servo_rotation+ " º";
        }

        if (sd_status != 1){
            document.getElementById("sdStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("sdStatusText").innerHTML = "Offline";
        }else {
            document.getElementById("sdStatusText").style.backgroundColor = "#01e774";
            document.getElementById("sdStatusText").innerHTML = "Online";
        }

        if (seeds_deployed != 1){
            document.getElementById("seedsStatusText").style.backgroundColor = "#e24a4a";
            document.getElementById("seedsStatusText").innerHTML = "Undeployed";
        }else {
            document.getElementById("seedsStatusText").style.backgroundColor = "#01e774";
            document.getElementById("seedsStatusText").innerHTML = "Deployed";
        }


        if(bmp_status == 1 && gps_status == 1 && gyro_status == 1 && apc_status == 1 && servo_status == 1 && sd_status == 1){
            document.getElementById("sysStatusText").innerHTML = "Online";
            document.getElementById("sysStatusText").style.backgroundColor = "#01e774";
        } else if (bmp_status == 1 || gps_status == 1 || gyro_status == 1 || apc_status == 1 || servo_status == 1 || sd_status == 1){
            document.getElementById("sysStatusText").innerHTML = "Partially Online";
            document.getElementById("sysStatusText").style.backgroundColor = "#ffd85c";
        } else {
            document.getElementById("sysStatusText").innerHTML = "Offline";
            document.getElementById("sysStatusText").style.backgroundColor = "#e24a4a";
        }



    } else {
        console.error('Invalid data format:', data);
    }
}

//Fetch Data ----- END
