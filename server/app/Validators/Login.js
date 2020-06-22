'use strict'

class Login {
  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    }
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'email.required': 'Email required',
      'email.email': 'Email must be valid',
      'password.required': 'Password required',
    }
  }

  /**
   * Messages when validation is failed
   */
  async fails(errorMessages) {
    return this.ctx.response.send({
      STATUS: 400,
      CODE: 'VALIDATION_FAILED',
      MESSAGES: errorMessages,
      TYPE: 'error',
    })
  }
}

module.exports = Login
