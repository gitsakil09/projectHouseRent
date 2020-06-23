import Vue from 'vue'
export const apiRoutes = {
  login: '/login',
  registration: '/registration',
  allRents: '/rents/all',
  allYourRents: '/rents/your/all',
  allUsers: '/users/all',
  addRent: '/rents/add',
  deleteRent: '/rents/delete',
  detailRent: '/rents/detail/edit',
  detailShowRent: '/rents/detail/show',
  updateRent: '/rents/update',
  allSearchedRents: '/rents/search/all',
  addReview: '/rents/review/add',
  addStat: '/rents/stat/add',
}

Vue.prototype.$APIRoutes = apiRoutes
