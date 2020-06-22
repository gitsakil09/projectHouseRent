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
/** Helper Modules */
/** Starting Class */
class AuthenticationController {
  /**
   * Registering a User
   * @param userInfo
   */
  async postRegistration({ request, response }) {
    try {
      console.log(request.all())
      const { username, email, password } = request.input('signUpInfo')
      // storing in the database
      const newUser = new User()
      newUser.username = username
      newUser.email = email
      newUser.password = password
      await newUser.save()
      // returning response
      return response.json({
        CODE: 'SIGNUP_SUCCESS',
        TYPE: 'success',
        MESSAGE: 'Account created Successfully.Please Login now.',
      })
    } catch (signUpError) {
      console.log(signUpError)
      // returning response
      return response.json({
        CODE: 'SIGNUP_ERROR',
        TYPE: 'error',
        MESSAGE: 'Registration failed.Please try again later.',
      })
    }
  }
  /**
   * User Login
   * @param loginInfo
   */
  async postLogin({ response, request, auth }) {
    try {
      console.log(request.all())
      const { email, password } = request.all()
      // attempting to login the client
      const client = await auth.withRefreshToken().attempt(email, password)
      return response.json({
        CODE: 'LOGIN_SUCCESS',
        TYPE: 'success',
        MESSAGE: 'Successfully logged in.',
        data: client,
      })
    } catch (loginError) {
      console.log(loginError.name)
      if (loginError && loginError.name === 'UserNotFoundException') {
        return response.json({
          CODE: 'LOGIN_ERROR',
          TYPE: 'error',
          MESSAGE:
            'YOur provided credentials are not correct.Pkease try again with the correct creds.',
        })
      }
    }
  }
}

module.exports = AuthenticationController
