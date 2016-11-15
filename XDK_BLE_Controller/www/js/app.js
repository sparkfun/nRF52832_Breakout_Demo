/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:true */
/*global ble*/

// BLE service and characteristic information
window.nrf = {
    deviceId: "EB:F3:44:71:A2:AE",
    service: "1207",
    characteristic: "1207"
};

/******************************************************************************
 * Bluetooth connection
 *****************************************************************************/

// Global app object we can use to create BLE callbacks
window.app = {

    // Call this first!
    initialize: function() {
        window.app.connect();
    },

    // Scan for and connect to our statically-encoded nRF52 MAC address
    connect: function() {
        debug("Scanning...");
        ble.scan([], 
                 5,
                 window.app.onDiscoverDevice,
                 window.app.onError);
    },

    // Find BLE devices in range and connect to the nRF52
    onDiscoverDevice: function(device) {
        debug("Found " + device.name + " at " + device.id);
        if (device.id === window.nrf.deviceId) {
            debug("Connecting to: " + window.nrf.deviceId);
            ble.connect(window.nrf.deviceId,
                        window.app.onConnect,
                        window.app.onError);
        }
    },

    //  On BLE connection, notify the user
    onConnect: function() {
        debug("Connected to " + window.nrf.deviceId);
    },
    
    // Update BLE characteristic when the button is pushed
    turnOn: function() {
        this.sendData(1);
    },
    
    // Update BLE characteristic when the button is pushed
    turnOff: function() {
        this.sendData(0);
    },
    
    sendData: function(data) {
        
        var success = function() {
            debug("Success");
        };

        var failure = function() {
            debug("Failed to write data to nRF52");
        };

        var buf = new Int8Array(1);
        buf[0] = data;
        
        debug("Sending: " + buf[0]);

        // Update BLE characteristic
        ble.write(window.nrf.deviceId,
                  window.nrf.service,
                  window.nrf.characteristic,
                  buf.buffer,
                  success,
                  failure);
    },

    // Alert the user if there is an error
    onError: function(err) {
        navigator.accelerometer.clearWatch(window.watchID);
        debug("Error: " + err);
        alert("Error: " + err);
    }
};

/******************************************************************************
 * Execution starts here after the phone has finished initializing
 *****************************************************************************/

// Short for jQuery(document).ready() method, which is called after the page
// has loaded. We can use this to assign callbacks to elements on the page.
$(function() {
    "use strict";

    // Assign a callback to the ON button
    $('#on_button').on('click', function(){
        window.app.turnOn();
    });
    
    // Assign a callback to the OFF button
    $('#off_button').on('click', function(){
        window.app.turnOff();
    });
});

// Wait for the device (phone) to be ready before connecting to the nRF52
// and polling the accelerometer
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    
    "use strict";

    // Prepare the BLE connection
    window.app.initialize();
}

// Create a pseudo-debugging console
// NOTE: Real apps can also use alert(), but list messages can be useful when
// you are debugging the program
function debug(msg) {
    $('#debug').append($('<li>').text(msg));
}