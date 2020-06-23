'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rentreview extends Model {
  /** Table Name */
  static get table() {
    return 'rent_reviews'
  }
  /** Relation with user */
  users() {
    return this.belongsTo('App/Models/User', 'user_id', 'id')
  }
  /** Relation with rent */
  rents() {
    return this.belongsTo('App/Models/Rent', 'rent_id', 'id')
  }
}

module.exports = Rentreview
