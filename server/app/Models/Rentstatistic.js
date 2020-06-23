'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rentstatistic extends Model {
  /** Table Name */
  static get table() {
    return 'rent_statistics'
  }
}

module.exports = Rentstatistic
