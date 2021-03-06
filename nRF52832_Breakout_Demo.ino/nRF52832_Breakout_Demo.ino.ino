// Import libraries (BLEPeripheral depends on SPI)
#include <SPI.h>
#include <BLEPeripheral.h>

// ***SUPER IMPORTANT!!!***
// This doesn't work very well. Really need a transistor to act as a switch 
// between pin 8 and the PowerSwitch Tail.

//////////////
// Hardware //
//////////////
#define LED_PIN    7 // LED on pin 7
#define LED_ACTIVE LOW // Pin 7 LED is active low
#define PST_PIN    8 // PST on pin 8
#define PST_ACTIVE HIGH

///////////////////////
// BLE Advertisments //
///////////////////////
const char * localName = "nRF52832 LED";
BLEPeripheral blePeriph;
BLEService bleServ("1207");
BLECharCharacteristic ledChar("1207", BLERead | BLEWrite);

void setup() 
{
  Serial.begin(115200); // Set up serial at 115200 baud

  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, !LED_ACTIVE);

  pinMode(PST_PIN, OUTPUT);
  digitalWrite(PST_PIN, !PST_ACTIVE);

  setupBLE();
}

void loop() 
{
  blePeriph.poll();

  if (ledChar.written())
  {
    int ledState = ledChar.value();
    Serial.print("Characteristic: ");
    Serial.println(ledState);
    if (ledState) {
      digitalWrite(LED_PIN, LED_ACTIVE);
      digitalWrite(PST_PIN, PST_ACTIVE);
    } else {
      digitalWrite(LED_PIN, !LED_ACTIVE);
      digitalWrite(PST_PIN, !PST_ACTIVE);
    }
  }
}

void setupBLE()
{
  // Advertise name and service:
  blePeriph.setDeviceName(localName);
  blePeriph.setLocalName(localName);
  blePeriph.setAdvertisedServiceUuid(bleServ.uuid());

  // Add service
  blePeriph.addAttribute(bleServ);

  // Add characteristic
  blePeriph.addAttribute(ledChar);

  // Now that device6, service, characteristic are set up,
  // initialize BLE:
  blePeriph.begin();

  // Set led characteristic to default value:
  ledChar.setValue(!LED_ACTIVE);  
}

