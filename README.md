# eCommerce Client

A React built front end to the [eCommerce API backend](https://github.com/alittlebroken/ecommerce)

## Description

The eCommerce client is a suite of software that makes up the frontend to an online store. 

This client as well as it's associated [backend](https://github.com/alittlebroken/ecommerce) make up a online store called The BeeHive.

The Beehive sells products for Bee Keepers around the world wether you are an hobbyist or Bee Keep for a living we have you covered.

## Features

 - Local Login & Registration
 - Google Signin
 - Product Search

## Test Site
The store can be located online [here](https://evening-dusk-31687.herokuapp.com/) and is currently hosted by [Heroku](https://heroku.com)

Please note that as it is a test store no actual purchases will be made from the backend.

There is a test card you can use if you wish to test out ordering as follows

```
Card Number: 4242 4242 4242 4242
Expiry: Any date in the future
CVV: 424
```

All other information you can make up when "placing" an order

As it is hosted on a Free Dyno please be patient as it may take a little while to start up on the first access.

## Getting Started

All commands specified below were run inside Windows PowerShell

### Dependencies

The frontend was developed and tested with the following software

- Windows 11
- React 17.0.2
- Google Identity Services API Key

Please see package.json for further dependencies

### Installing

I have assumed that you have already setup the API backend locally

- Clone the repo to your local machine
```
git clone https://github.com/alittlebroken/ecommerce-client.git
```

- Change into the client folder
```
cd ecommerce-client
```

- Install all required packages
```
npm install
```

### Configuring

* Create a copy of .env.MODIFY
```
copy .env.MODIFY .env
```

* Now set the appropriate values for your system

Make sure that you use hard to guess secrets and use different secrets for each environment you have

### Starting the client

- Issue the command
```
npm start
```

After a short time the site will load in your default Browser

## Authors

Paul Lockyer
[@lockyerp](https://twitter.com/lockyerp)

## Version Hsitory

- 0.1
   - Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details