'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RentStatisticsSchema extends Schema {
  up () {
    this.create('rent_statistics', (table) => {
      table.increments()
      table.integer('rent_id').unsigned().references('id').inTable('rents')
      table.integer('total_viewed').default(0)
      table.integer('total_liked').default(0)
      table.integer('total_wishlisted').default(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('rent_statistics')
  }
}

module.exports = RentStatisticsSchema
