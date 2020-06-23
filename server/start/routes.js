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

Route.group(() => {
  Route.get('/users/all', 'RentController.getAllUsers').as('users.all')
  Route.get('/rents/all', 'RentController.getAllRents').as('rents.all')
  Route.get(
    '/rents/detail/show/:rentId',
    'RentController.getRentShowDetail'
  ).as('rents.detail.show')
  Route.get('/rents/search/all', 'RentController.getAllSearchedRents').as(
    'rents.search.all'
  )
})
  .namespace('Rent')
  .prefix('/api/v1')

Route.group(() => {
  Route.get('/rents/your/all', 'RentController.getAllYourRents').as('rents.all')
  Route.post('/rents/add', 'RentController.postAddRent').as('rents.add')
  Route.post('/rents/delete', 'RentController.postDeleteRent').as(
    'rents.delete'
  )
  Route.get('/rents/detail/edit/:rentId', 'RentController.getRentDetail').as(
    'rents.detail.edit'
  )
  Route.post('/rents/update', 'RentController.postUpdateRent').as(
    'rents.update'
  )
  Route.post('/rents/review/add', 'RentController.postAddRentReview').as(
    'rents.review.add'
  )
  Route.post('/rents/stat/add', 'RentController.postAddRentStat').as(
    'rents.stat.add'
  )
})
  .middleware(['auth:jwt'])
  .namespace('Rent')
  .prefix('/api/v1')
