'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RentsSchema extends Schema {
  up() {
    this.create('rents', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users') // owner/advertizer name
      table.string('house_name').notNullable()
      table.integer('total_floor_no').notNullable()
      table.integer('rented_floor_no').notNullable()
      table.string('rented_flat_no').notNullable()
      table.boolean('gas_available').notNullable().default(1)
      table.boolean('electricity_available').notNullable().default(1)
      table.boolean('water_available').notNullable().default(1)
      table.text('address').notNullable()
      table.text('pictures').nullable()
      table
        .boolean('is_available')
        .default(1)
        .comment('0 not available, 1 available')
      table.integer('status').default(1).comment('0 inactive, 1 active')
      table.timestamps()
    })
  }

  down() {
    this.drop('rents')
  }
}

module.exports = RentsSchema
