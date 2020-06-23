'use strict'
/**
 ** File Name: AuthenticationController.js
 ** Handling all kinds of Authentication Related Tasks
 ** Namespace: App/Controllers/Http/Auth
 ** Developed By: Sakil Ahmed
 ** Company Website: http://www.devech.com
 ** Maintained By: Sakil Ahmed
 ** Email: sakil.ruet09@gmail.com
 ** Skype: sakil_ruet
 ** License: Sakil Ahmed
 **/
/** Models */
const User = use('App/Models/User')
const Rent = use('App/Models/Rent')
const Rentreview = use('App/Models/Rentreview')
const Rentstatistic = use('App/Models/Rentstatistic')
/** Helper Modules */
const Helpers = use('Helpers')
/** Starting Class */
class RentController {
  /**
   * Getting All Users
   * @param null
   */
  async getAllUsers({ request, response }) {
    try {
      const users = await User.query().select('id', 'username').fetch()
      return users
    } catch (userError) {
      console.log(userError)
    }
  }
  /**
   * Getting All Rents
   * @param null
   */
  async getAllRents({ request, response }) {
    try {
      const rents = await Rent.query()
        .with('users', (builder) => {
          builder.select('id', 'username')
        })
        .fetch()
      return rents
    } catch (rentError) {
      console.log(rentError)
    }
  }
  /**
   * Getting All Your Rents
   * @param null
   */
  async getAllYourRents({ auth, request, response }) {
    const client = await auth.getUser()
    try {
      const rents = await Rent.query().where('user_id', client.id).fetch()
      return rents
    } catch (rentError) {
      console.log(rentError)
    }
  }
  /**
   * Adding New Rent
   * @param rentInfo
   */
  async postAddRent({ request, response, auth }) {
    let client = await auth.getUser()
    try {
      // console.log(request.all())
      const {
        house_name,
        total_floor_no,
        rented_floor_no,
        rented_flat_no,
        gas_available,
        electricity_available,
        water_available,
        address,
      } = request.all()
      // pictures
      const pictures = request.file('file')
      let pictureString = ''
      if (pictures && pictures.files && pictures.files.length > 0) {
        let myFiles = pictures.files
        pictures.moveAll(
          '/github/projectHouseRent/client/static/uploads',
          (file) => {
            let random_name = Math.random() * 123456
            let time = new Date().getTime()
            pictureString +=
              '/uploads/' + `${random_name}_${time}.${file.subtype}` + '/#/'
            return {
              name: `${random_name}_${time}.${file.subtype}`,
            }
          }
        )
      }
      // inserting in the database
      const newRent = new Rent()
      newRent.user_id = client.id
      newRent.house_name = house_name
      newRent.total_floor_no = total_floor_no
      newRent.rented_floor_no = rented_floor_no
      newRent.rented_flat_no = rented_flat_no
      newRent.gas_available = gas_available === 'yes' ? 1 : 0
      newRent.electricity_available = electricity_available === 'yes' ? 1 : 0
      newRent.water_available = water_available === 'yes' ? 1 : 0
      newRent.address = address
      newRent.pictures = pictureString
      await newRent.save()
      // returning success response
      return response.json({
        CODE: 'RENT_ADDED_SUCCESS',
        TYPE: 'success',
        MESSAGE: 'Rent added successfully.',
      })
    } catch (rentError) {
      console.log(rentError)
      return response.json({
        CODE: 'RENT_ADDED_ERROR',
        TYPE: 'error',
        MESSAGE: 'Rent added failed.',
      })
    }
  }
  /**
   * Deleting Rent
   * @param id
   */
  async postDeleteRent({ request, response, auth }) {
    let client = await auth.getUser()
    try {
      const { id } = request.all()

      // checking rent exist
      const checkRent = await Rent.query()
        .where('user_id', client.id)
        .where('id', id)
        .first()
      if (!checkRent) {
        return response.json({
          CODE: 'RENT_DELETED_ERROR',
          TYPE: 'error',
          MESSAGE: 'Rent Missing.',
        })
      }
      await checkRent.delete()
      // returning success response
      return response.json({
        CODE: 'RENT_DELETED_SUCCESS',
        TYPE: 'success',
        MESSAGE: 'Rent deleted successfully.',
      })
    } catch (rentDeleteError) {
      return response.json({
        CODE: 'RENT_DELETED_ERROR',
        TYPE: 'error',
        MESSAGE: 'Rent deleted failed.',
      })
    }
  }
  /**
   * Getting Rent Detail
   * @param rentId
   */
  async getRentDetail({ auth, request, response, params }) {
    const client = await auth.getUser()
    try {
      // console.log(params.rentId)
      const rentId = Number(params.rentId)

      const rent = await Rent.query()
        .where('user_id', client.id)
        .where('id', rentId)
        .first()
      return rent
    } catch (rentError) {
      console.log(rentError)
    }
  }
  /**
   * Adding New Rent
   * @param rentInfo
   */
  async postUpdateRent({ request, response, auth }) {
    let client = await auth.getUser()
    try {
      // console.log(request.all())
      const {
        rent_id,
        house_name,
        total_floor_no,
        rented_floor_no,
        rented_flat_no,
        gas_available,
        electricity_available,
        water_available,
        address,
      } = request.all()

      // checking rent exist
      const checkRent = await Rent.query()
        .where('user_id', client.id)
        .where('id', rent_id)
        .first()
      if (!checkRent) {
        return response.json({
          CODE: 'RENT_DELETED_ERROR',
          TYPE: 'error',
          MESSAGE: 'Rent Missing.',
        })
      }
      // pictures
      const pictures = request.file('file')
      let pictureString = ''
      if (pictures && pictures.files && pictures.files.length > 0) {
        let myFiles = pictures.files
        pictures.moveAll(
          '/github/projectHouseRent/client/static/uploads',
          (file) => {
            let random_name = Math.random() * 123456
            let time = new Date().getTime()
            pictureString +=
              '/uploads/' + `${random_name}_${time}.${file.subtype}` + '/#/'
            return {
              name: `${random_name}_${time}.${file.subtype}`,
            }
          }
        )
      }
      // inserting in the database
      checkRent.user_id = client.id
      checkRent.house_name = house_name
      checkRent.total_floor_no = total_floor_no
      checkRent.rented_floor_no = rented_floor_no
      checkRent.rented_flat_no = rented_flat_no
      checkRent.gas_available = gas_available === 'yes' ? 1 : 0
      checkRent.electricity_available = electricity_available === 'yes' ? 1 : 0
      checkRent.water_available = water_available === 'yes' ? 1 : 0
      checkRent.address = address
      if (pictures && pictures.files && pictureString) {
        checkRent.pictures = pictureString
      }
      await checkRent.save()
      // returning success response
      return response.json({
        CODE: 'RENT_UPDATED_SUCCESS',
        TYPE: 'success',
        MESSAGE: 'Rent updated successfully.',
      })
    } catch (rentError) {
      console.log(rentError)
      return response.json({
        CODE: 'RENT_UPDATED_ERROR',
        TYPE: 'error',
        MESSAGE: 'Rent updated failed.',
      })
    }
  }
  /**
   * Getting Rent Detail to Show
   * @param rentId
   */
  async getRentShowDetail({ request, response, params }) {
    try {
      // console.log(params.rentId)
      const rentId = Number(params.rentId)
      // updating the rent_statistics
      const stat = await Rentstatistic.query().where('rent_id', rentId).first()
      if (!stat) {
        // creating one
        const newStat = new Rentstatistic()
        newStat.rent_id = rentId
        newStat.total_viewed = 1
        await newStat.save()
      } else {
        // adding one view
        stat.total_viewed = stat.total_viewed + +1
        await stat.save()
      }
      const rent = await Rent.query()
        .where('id', rentId)
        .with('users', (builder) => {
          builder.select('id', 'username', 'email')
        })
        .with('rentstatistics', (builder) => {
          builder.select(
            'id',
            'rent_id',
            'total_viewed',
            'total_liked',
            'total_wishlisted'
          )
        })
        .with('rentreviews', (builder) => {
          builder
            .with('users', (builder) => {
              builder.select('id', 'username', 'email')
            })
            .select(
              'id',
              'review_comments',
              'review_stars',
              'status',
              'user_id',
              'rent_id'
            )
        })
        .first()
      return rent
    } catch (rentError) {
      console.log(rentError)
    }
  }
  /**
   * Getting All Searched Rents
   * @param null
   */
  async getAllSearchedRents({ request, response, params }) {
    try {
      const { search } = request.all()
      const rents = await Rent.query()
        .with('users', (builder) => {
          builder.select('id', 'username', 'email')
        })
        .where(function () {
          if (search && search !== null) {
            this.where('house_name', 'like', '%' + search + '%')
            this.where('address', 'like', '%' + search + '%')
            // you can add more here
          } else {
            1 // all rents
          }
        })
        .fetch()
      return rents
    } catch (rentError) {
      console.log(rentError)
    }
  }
  /**
   * Adding New Rent Review
   * @param reviewInfo
   */
  async postAddRentReview({ request, response, auth }) {
    let client = await auth.getUser()
    try {
      // console.log(request.all())
      const { rent_id, review_comments, review_stars } = request.input(
        'reviewInfo'
      )
      // checking rent exist
      const checkRent = await Rent.query()
        .where('user_id', client.id)
        .where('id', rent_id)
        .first()
      if (!checkRent) {
        return response.json({
          CODE: 'REVIEW_ADD_ERROR',
          TYPE: 'error',
          MESSAGE: 'Rent Missing.',
        })
      }
      // inserting in the database
      const review = new Rentreview()
      review.user_id = client.id
      review.rent_id = rent_id
      review.review_comments = review_comments
      review.review_stars = review_stars
      await review.save()

      // last review
      const lastReview = await Rentreview.query()
        .where('id', review.id)
        .with('users', (builder) => {
          builder.select('id', 'username', 'email')
        })
        .select(
          'id',
          'review_comments',
          'review_stars',
          'status',
          'user_id',
          'rent_id'
        )
        .first()
      // returning success response
      return response.json({
        CODE: 'REVIEW_ADDED_SUCCESS',
        TYPE: 'success',
        MESSAGE: 'Review added successfully.',
        DATA: lastReview,
      })
    } catch (reviewError) {
      return response.json({
        CODE: 'REVIEW_ADDED_ERROR',
        TYPE: 'error',
        MESSAGE: 'Review added failed.',
      })
    }
  }
  /**
   * Adding New Rent Review
   * @param type
   * @param id
   */
  async postAddRentStat({ request, response, auth }) {
    let client = await auth.getUser()
    try {
      // console.log(request.all())
      const { id, type } = request.all()
      // checking rent exist
      const checkRent = await Rentstatistic.query().where('id', id).first()

      if (!checkRent) {
        // creating one
        const newStat = new Rentstatistic()
        newStat.rent_id = rentId
        if (type === 'like') {
          newStat.total_liked = 1
        } else if (type === 'wish') {
          newStat.total_wishlisted = 1
        }
        await newStat.save()
      } else {
        // adding one stat
        if (type === 'like') {
          checkRent.total_liked = 1
        } else if (type === 'wish') {
          checkRent.total_wishlisted = 1
        }
        await checkRent.save()
      }
      // returning success response
      return response.json({
        CODE: 'STAT_ADDED_SUCCESS',
        TYPE: 'success',
        MESSAGE: 'Stat added successfully.',
      })
    } catch (statError) {
      return response.json({
        CODE: 'STAT_ADDED_ERROR',
        TYPE: 'error',
        MESSAGE: 'Stat added failed.',
      })
    }
  }
}

module.exports = RentController
