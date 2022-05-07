# Konnector Mobile App

## What is this repository for?

The Mobile UI for Konnector

## How do I get set up?

* Install NPM
* Install Expo CLI (React Native build tools) `$ npm install -g expo-cli`
* See Expo instructions `$ expo`
* If running against the backend locally
  * Ensure the backend's `secure` flag is not in use for cookies (`server.servlet.session.cookie.secure` in application.properties)
  * Ensure your mobile device is connected to the same WiFi device as the backend is running on
  * Ensure your firewall is turned off
  * Update `constants/API.ts` `BASE_URL`
* Start the development server `$ expo start`/`$ npm start`
* Open the Expo Go app on your mobile device
* Choose the option to scan an Expo QR code through the app and point it at the QR code on your command line or Expo browser page

If the Expo app is not auto-updating with your latest changes, close all mobile applications and relaunch Expo app.

## Resources

* https://reactnative.dev/docs/tutorial
* https://reactnative.dev/docs/environment-setup
* https://reactnative.dev/docs/network
* https://docs.expo.io/
