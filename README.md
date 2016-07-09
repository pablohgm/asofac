# ASOFAC
- forked from a3bhea/electron-loopback-angularjs

This is just a glued scaffold for a cross platform desktop application using

* Electron - https://github.com/atom/electron - to wrap the whole thing in a desktop app
* Loopback - https://github.com/strongloop/loopback - for persistend models
* AngularJS - https://github.com/angular/angular.js - for the MVC part

# Installation

1. run `npm install` inside the root folder
2. run `bower install` inside the root folder

# Start the application

To start the app type `npm start` in project's root directory

# Structure

[PROJECT_ROOT]/index.js runs the whole app using `electron .`

[PROJECT_ROOT]/server holds the LoopBack server part

[PROJECT_ROOT]/common/models holds LoopBack models

[PROJECT_ROOT]/client holds the AngularJs app
