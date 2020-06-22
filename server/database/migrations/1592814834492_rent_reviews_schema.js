'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RentReviewsSchema extends Schema {
  up() {
    this.create('rent_reviews', (table) => {
      table.increments()
      table.integer('rent_id').unsigned().references('id').inTable('rents')
      table.text('review_comments').notNullable()
      table.float('review_stars').notNullable().default(5.0)
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .comment('Reviewed User')
      table.integer('status', 1).comment('0 inactive, 1 active, 2 deleted')
      table.timestamps()
    })
  }

  down() {
    this.drop('rent_reviews')
  }
}

module.exports = RentReviewsSchema
