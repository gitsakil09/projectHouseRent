/**
 ** File Name: Notifications.js
 ** Handling the Toast Messages
 ** Namespace: plugins/
 ** Developed By: Sakil Ahmed
 ** Company Website: http://www.devech.com
 ** Maintained By: Sakil Ahmed
 ** Email: info@devech.com
 ** Skype: sakil_ruet
 ** License: Sakil Ahmed
 **/

import Vue from 'vue'
import swal from 'sweetalert2'
/** Notifications */
import Toast from 'izitoast' // https://github.com/dolce/iziToast
import 'izitoast/dist/css/iziToast.min.css'

/** Declaring Different Toast Types */
const toast = {
  // Success Notification
  success: (
    message,
    position = 'topRight',
    timeout = 5000,
    title = 'Success'
  ) => {
    return Toast.success({
      // title: '',
      message: message,
      position: position,
      timeout: timeout,
    })
  },
  // End of Success Notification
  // Error Notification
  error: (message, position = 'topRight', timeout = 5000, title = 'Error') => {
    return Toast.error({
      // title: '',
      message: message,
      position: position,
      timeout: timeout,
    })
  },
  // End of Error Notification
  // Info Notification
  info: (message, position = 'topRight', timeout = 5000, title = 'Info') => {
    return Toast.info({
      // title: '',
      message: message,
      position: position,
      timeout: timeout,
    })
  },
  // End of Info Notification
  // Warning Notification
  warning: (
    message,
    position = 'topRight',
    timeout = 5000,
    title = 'Warning'
  ) => {
    return Toast.warning({
      // title: '',
      message: message,
      position: position,
      timeout: timeout,
    })
  },
  // End of Warning Notification
}

/** Declaration for Global Use */
Vue.prototype.$toast = toast
Vue.prototype.$swal = swal
