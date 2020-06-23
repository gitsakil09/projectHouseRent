'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rent extends Model {
  /** Table Name */
  static get table() {
    return 'rents'
  }
  /** Relation with user */
  users() {
    return this.belongsTo('App/Models/User', 'user_id', 'id')
  }
  /** Relation with review */
  rentreviews() {
    return this.hasMany('App/Models/Rentreview', 'id', 'rent_id')
  }
  /** Relation with statistics */
  rentstatistics() {
    return this.hasOne('App/Models/Rentstatistic', 'id', 'rent_id')
  }
}

module.exports = Rent
