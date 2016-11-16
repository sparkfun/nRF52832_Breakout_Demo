Demonstration of the [SparkFun nRF52832 Breakout Board](https://www.sparkfun.com/products/13990). Load the nRF52832_Breakout_Demo.ino file onto the nRF52832 Breakout Board. 

Use the [Intel® XDK](https://software.intel.com/en-us/intel-xdk) to build the XDK_BLE_Controller for your phone. You will need to change `deviceId` in *app.js* to your nRF52832's BLE MAC address.

As the Arduino code is running on the nRF52832, open the phone app, which should automatically connect to the nRF52832. Press ON to send the "on" signal over BLE and press OFF to send the "off" signal (i.e. write a 1 or 0 to the BLE characteristic).

**IMPORTANT**: Add a transistor as a switch between pin 8 on the nRF52832 and the +in pin on the PowerSwitch Tail.

More information on the nRF52832 Breakout Board can be found [here](https://learn.sparkfun.com/tutorials/nrf52832-breakout-board-hookup-guide). Using the Intel XDK can be found [here](https://learn.sparkfun.com/tutorials/sparkfun-inventors-kit-for-edison-experiment-guide/using-the-xdk).

### License

**SparkFun code, firmware, and software is released under the MIT License(http://opensource.org/licenses/MIT).**

The MIT License (MIT)

Copyright (c) 2015 SparkFun Electronics

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
