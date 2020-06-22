'use strict'

class Registration {
  get rules() {
    return {
      'signUpInfo.username': 'required',
      'signUpInfo.email': 'required|email|unique:users,email',
      'signUpInfo.password': 'required|min:6',
    }
  }
  /**
   * Custom validation Messages
   * @param null
   */
  get messages() {
    return {
      'signUpInfo.username.required': 'Username required',
      'signUpInfo.email.required': 'Email required',
      'signUpInfo.email.email': 'Email must be valid',
      'signUpInfo.email.unique': 'Email is already registered',
      'signUpInfo.password.required': 'Password required',
      'signUpInfo.password.min': 'Password should at least be 6 characters',
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

module.exports = Registration
