'use strict'

const { RouteGroup } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('/login', 'AuthenticationController.postLogin')
    .as('user.login')
    .validator('Login')
  Route.post('/registration', 'AuthenticationController.postRegistration')
    .as('user.signup')
    .validator('Registration')
})
  .namespace('Auth')
  .prefix('/api/v1')
