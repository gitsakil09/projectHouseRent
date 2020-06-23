<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>-->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>-->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item @click="loginDialog = true" v-if="!$auth || !$auth.user">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="$auth && $auth.user" @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>-->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!-- Dialog to Login -->
    <v-dialog v-model="loginDialog" max-width="30%" persistent>
      <v-card>
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
          <v-form ref="loginForm">
            <v-text-field
              name="Email"
              label="Email *"
              v-model="loginInfo.email"
              :rules="[rules.required, rules.validEmail]"
            ></v-text-field>
            <v-text-field
              name="Password"
              label="Password *"
              :type="show1 ? 'text' : 'password'"
              v-model="loginInfo.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :rules="[rules.required, rules.min]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="green darken-1" @click="loginDialog = false">Close</v-btn>
          <v-btn
            small
            color="primary"
            :loading="isLoginLoading"
            :disabled="
              !loginInfo.email || !loginInfo.password || isLoginLoading
            "
            @click="tryLogin"
          >Login</v-btn>
        </v-card-actions>
        <v-card-actions>
          <div class="ma-2">
            <v-btn
              color="primary"
              text
              small
              @click="
                signUpDialog = true
                loginDialog = false
              "
            >Sign Up</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of Dialog to Login -->
    <!-- Dialog to SignUp -->
    <v-dialog v-model="signUpDialog" max-width="30%" persistent>
      <v-card>
        <v-card-title class="headline">Sign Up</v-card-title>
        <v-card-text>
          <v-form ref="signUpForm">
            <v-text-field
              name="Username"
              label="Username *"
              v-model="signUpInfo.username"
              :rules="[rules.required]"
              :error-messages="
                errors &&
                errors.find((error) => error.field === 'signUpInfo.username')
                  ? errors.find(
                      (error) => error.field === 'signUpInfo.username'
                    ).message
                  : ''
              "
            ></v-text-field>
            <v-text-field
              name="Email"
              label="Email *"
              v-model="signUpInfo.email"
              :rules="[rules.required, rules.validEmail]"
              :error-messages="
                errors &&
                errors.find((error) => error.field === 'signUpInfo.email')
                  ? errors.find((error) => error.field === 'signUpInfo.email')
                      .message
                  : ''
              "
            ></v-text-field>
            <v-text-field
              name="Password"
              label="Password *"
              :type="show1 ? 'text' : 'password'"
              v-model="signUpInfo.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :rules="[rules.required, rules.min]"
              :error-messages="
                errors &&
                errors.find((error) => error.field === 'signUpInfo.password')
                  ? errors.find(
                      (error) => error.field === 'signUpInfo.password'
                    ).message
                  : ''
              "
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="green darken-1" @click="signUpDialog = false">Close</v-btn>
          <v-btn
            small
            color="primary"
            :loading="isSignUpLoading"
            :disabled="
              !signUpInfo.username ||
              !signUpInfo.email ||
              !signUpInfo.password ||
              isSignUpLoading
            "
            @click="tryRegistration"
          >Sign Up</v-btn>
        </v-card-actions>
        <v-card-actions>
          <div class="ma-2">
            <v-btn
              color="primary"
              text
              small
              @click="
                loginDialog = true
                signUpDialog = false
              "
            >Login</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End of Dialog to SignUp -->
  </v-app>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      show1: false,
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Rent List',
          to: '/rents/list',
        },
        {
          icon: 'mdi-plus',
          title: 'Add Rent',
          to: '/rents/add',
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Your Rents',
          to: '/rents/your/list',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'HouseRent',
      loginDialog: false,
      signUpDialog: false,
      loginInfo: {
        email: 'a@a.com',
        password: '123456',
      },
      rules: {
        required: (v) => !!v || 'Value Required.',
        min: (v) => v.length >= 6 || 'Min 6 characters',
        validEmail: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      },
      isLoginLoading: false,
      isSignUpLoading: false,
      signUpInfo: {
        username: 'John Doe',
        email: 'john@john.com',
        password: '12345',
      },
      errors: [],
    }
  },
  mounted() {
    // console.log(this.$APIRoutes.login)
  },
  computed: {},
  watch: {
    'signUpInfo.username': function (value) {
      if (value) {
        if (
          this.errors &&
          this.errors.find((error) => error.field === 'signUpInfo.username')
        ) {
          this.errors.splice(
            this.errors.find((error) => error.field === 'signUpInfo.username')
          )
        }
      }
    },
    'signUpInfo.email': function (value) {
      if (value) {
        if (
          this.errors &&
          this.errors.find((error) => error.field === 'signUpInfo.email')
        ) {
          this.errors.splice(
            this.errors.find((error) => error.field === 'signUpInfo.email')
          )
        }
      }
    },
    'signUpInfo.password': function (value) {
      if (value) {
        if (
          this.errors &&
          this.errors.find((error) => error.field === 'signUpInfo.password')
        ) {
          this.errors.splice(
            this.errors.find((error) => error.field === 'signUpInfo.password')
          )
        }
      }
    },
    'loginInfo.email': function (value) {
      if (value) {
        if (
          this.errors &&
          this.errors.find((error) => error.field === 'loginInfo.email')
        ) {
          this.errors.splice(
            this.errors.find((error) => error.field === 'loginInfo.email')
          )
        }
      }
    },
    'loginInfo.password': function (value) {
      if (value) {
        if (
          this.errors &&
          this.errors.find((error) => error.field === 'loginInfo.password')
        ) {
          this.errors.splice(
            this.errors.find((error) => error.field === 'loginInfo.password')
          )
        }
      }
    },
  },
  methods: {
    /**
     * Logging in User
     * @param loginInfo
     */
    async tryLogin() {
      let _this = this
      try {
        _this.errors = []
        _this.isLoginLoading = true
        await _this.$auth
          .loginWith('local', { data: _this.loginInfo })
          .then((response) => {
            _this.isLoginLoading = false
            if (response && response.STATUS === 400) {
              _this.errors = response.MESSAGES
            } else if (
              response &&
              response.data &&
              response.data.TYPE === 'success'
            ) {
              _this.loginDialog = false
              _this.$toast.success(
                response.data.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
            } else if (
              response &&
              response.data &&
              response.data.TYPE === 'error'
            ) {
              _this.$toast.error(
                response.data.MESSAGE,
                'topRight',
                5000,
                'error'
              )
            } else {
              _this.$toast.error(
                'Something went wrong.Please contact with the administrator',
                'topRight',
                5000,
                'Error'
              )
            }
          })
          .catch((error) => {
            _this.isLoginLoading = false
            _this.$toast.error(
              'Something went wrong.Please contact with the administrator',
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (loginError) {
        _this.isLoginLoading = false
        _this.$toast.error(
          'Something went wrong.Please contact with the administrator',
          'topRight',
          5000,
          'Error'
        )
      }
    },
    /**
     * Signing Up
     * @param signUpInfo
     */
    async tryRegistration() {
      let _this = this
      try {
        _this.errors = []
        _this.isSignUpLoading = true
        await _this.$axios
          .$post(_this.$APIRoutes.registration, {
            signUpInfo: _this.signUpInfo,
          })
          .then((response) => {
            _this.isSignUpLoading = false
            if (response && response.STATUS === 400) {
              _this.errors = response.MESSAGES
            } else if (response && response.TYPE === 'success') {
              _this.signUpDialog = false
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'success'
              )
            } else if (response && response.TYPE === 'error') {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'error')
            }
          })
          .catch((error) => {
            _this.isSignUpLoading = false
            _this.$toast.error(
              'Something went wrong.Please contact with the administrator',
              'topRight',
              5000,
              'error'
            )
          })
      } catch (signUpError) {
        _this.isSignUpLoading = false
        _this.$toast.error(
          'Something went wrong.Please contact with the administrator',
          'topRight',
          5000,
          'error'
        )
      }
    },
    /**
     * Logging Out
     * @param null
     */
    async logout() {
      try {
        this.$auth.logout()
        return this.$router.push('/')
      } catch (logoutError) {
        console.log(logoutError)
      }
    },
  },
}
</script>
