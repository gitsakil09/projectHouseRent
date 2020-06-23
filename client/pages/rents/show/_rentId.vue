<template>
  <client-only>
    <v-layout justify-center align-center>
      <v-flex xs12 sm8 md8>
        <v-card>
          <v-card-title primary-title class="text-center"
            >Rent Detail</v-card-title
          >
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-form ref="showRentForm">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          name="Owner Name"
                          label="Owner Name"
                          :value="
                            showRentInfo && showRentInfo.users
                              ? showRentInfo.users.username
                              : '--'
                          "
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          name="Owner Email"
                          label="Owner Email"
                          v-model="showRentInfo.house_name"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          name="House Name"
                          label="House Name"
                          v-model="showRentInfo.house_name"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-text-field
                          label="Total floors"
                          v-model="showRentInfo.total_floor_no"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-text-field
                          label="Rented floors"
                          v-model="showRentInfo.rented_floor_no"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-text-field
                          label="Rented flat"
                          v-model="showRentInfo.rented_flat_no"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          label="Gas"
                          v-model="showRentInfo.gas_available"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          label="Electricity"
                          v-model="showRentInfo.electricity_available"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          label="Water"
                          v-model="showRentInfo.water_available"
                          readonly
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-textarea
                          name="Address"
                          label="Address *"
                          v-model="showRentInfo.address"
                          rows="3"
                          readonly
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="12">
                        <!-- Showing Pictures -->
                        <v-card flat>
                          <v-card-title primary-title>
                            Pictures
                          </v-card-title>
                          <v-container fluid>
                            <v-row>
                              <v-col
                                v-for="(picture, index) in pictureArray"
                                :key="index"
                                class="d-flex child-flex"
                                cols="4"
                              >
                                <v-card flat tile class="d-flex">
                                  <v-img
                                    :src="`${picture}`"
                                    :lazy-src="`https://picsum.photos/10/6?image=${
                                      index * 5 + 10
                                    }`"
                                    aspect-ratio="1"
                                    class="grey lighten-2"
                                  >
                                    <template v-slot:placeholder>
                                      <v-row
                                        class="fill-height ma-0"
                                        align="center"
                                        justify="center"
                                      >
                                        <v-progress-circular
                                          indeterminate
                                          color="grey lighten-5"
                                        ></v-progress-circular>
                                      </v-row>
                                    </template>
                                  </v-img>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                        <!-- End of Showing Pictures -->
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                <v-row>
                  <v-col cols="12" md="12">
                    <!-- Showing Pictures -->
                    <v-card flat>
                      <v-card-title primary-title>
                        Statistics
                      </v-card-title>
                      <v-container fluid>
                        <v-btn color="red" small>
                          Total Viewed:
                          {{
                            showRentInfo && showRentInfo.rentstatistics
                              ? showRentInfo.rentstatistics.total_viewed
                              : 0
                          }}
                        </v-btn>
                        <v-btn color="green" small>
                          Total Liked:
                          {{
                            showRentInfo && showRentInfo.rentstatistics
                              ? showRentInfo.rentstatistics.total_liked
                              : 0
                          }}
                        </v-btn>
                        <v-btn
                          color="primary"
                          small
                          title="like it"
                          @click="addStat('like')"
                        >
                          <v-icon small>mdi-thumb-up</v-icon>
                        </v-btn>
                        <v-btn color="teal" small>
                          Total Wishlisted:
                          {{
                            showRentInfo && showRentInfo.rentstatistics
                              ? showRentInfo.rentstatistics.total_wishlisted
                              : 0
                          }}
                        </v-btn>
                        <v-btn
                          color="primary"
                          small
                          title="add wishlist"
                          @click="addStat('wish')"
                        >
                          <v-icon small>mdi-heart-outline</v-icon>
                        </v-btn>
                      </v-container>
                    </v-card>
                    <!-- End of Showing Pictures -->
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <!-- Showing Pictures -->
                    <v-card flat>
                      <v-card-title primary-title>
                        Reviews
                      </v-card-title>
                      <v-container fluid>
                        <v-list-item
                          three-line
                          v-if="
                            showRentInfo &&
                            showRentInfo.rentreviews &&
                            showRentInfo.rentreviews.length > 0
                          "
                          v-for="(review, index) in showRentInfo.rentreviews"
                          :key="index"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{
                              review.review_comments
                            }}</v-list-item-title>
                            <v-list-item-subtitle>
                              <!-- Rating: {{ review.review_stars.toFixed(2) }} -->
                              <v-rating
                                :value="review.review_stars"
                                readonly
                                x-small
                              ></v-rating>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                              {{
                                review && review.users
                                  ? review.users.username
                                  : 'Anonymous'
                              }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item three-line v-else
                          >No review yet</v-list-item
                        >
                      </v-container>
                      <!-- Review Section -->
                      <template v-if="$auth && $auth.user">
                        <v-textarea
                          label="Comment *"
                          class="ma-5"
                          v-model="reviewInfo.review_comments"
                          rows="5"
                        ></v-textarea>
                        <v-rating
                          color="red"
                          v-model="reviewInfo.review_stars"
                          half-increments
                          hover
                        ></v-rating>
                        <v-btn
                          small
                          color="success"
                          class="ma-3"
                          :loading="isAddReviewLoading"
                          @click="addReview"
                          :disabled="
                            !reviewInfo.review_comments ||
                            !reviewInfo.review_stars ||
                            isAddReviewLoading
                          "
                          ><v-icon small>mdi-plus</v-icon>Add</v-btn
                        >
                      </template>
                      <template v-else>
                        <p class="text-center">Login to Review</p>
                      </template>
                      <!-- End of Review Section -->
                    </v-card>
                    <!-- End of Showing Pictures -->
                  </v-col>
                </v-row>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </client-only>
</template>
<script>
export default {
  name: 'ShowRentDetail',
  head() {
    return {
      titleTemplate: 'Rent Detail | %s',
    }
  },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.rentId)
  },
  data() {
    return {
      showRentInfo: [],
      pictureArray: [],
      reviewInfo: {
        rent_id: this.$route.params.rentId,
        review_comments: '',
        review_stars: 4.5,
      },
      isAddReviewLoading: false,
    }
  },
  async mounted() {
    await this.getRentDetail(this.$route.params.rentId)
  },
  computed: {},
  watch: {
    showRentInfo: function () {
      let pictures = this.showRentInfo.pictures
      // splitting the images
      this.pictureArray = pictures ? pictures.split('/#/') : []
      if (this.pictureArray && this.pictureArray.length > 0) {
        this.pictureArray.splice(this.pictureArray.length - 1)
      }
    },
  },
  methods: {
    /**
     * Getting Single rent Detail
     * @param rentId
     */
    async getRentDetail(rentId) {
      let _this = this
      try {
        await _this.$axios
          .$get(_this.$APIRoutes.detailShowRent + '/' + rentId)
          .then((response) => {
            _this.showRentInfo = response
            _this.showRentInfo.gas_available =
              _this.showRentInfo.gas_available === 1 ? 'yes' : 'no'
            _this.showRentInfo.electricity_available =
              _this.showRentInfo.electricity_available === 1 ? 'yes' : 'no'
            _this.showRentInfo.water_available =
              _this.showRentInfo.water_available === 1 ? 'yes' : 'no'
          })
          .catch((error) => {})
      } catch (detailError) {
        console.log(detailError)
      }
    },
    /**
     * Adding Review
     * @param reviewInfo
     */
    async addReview() {
      let _this = this
      try {
        _this.isAddReviewLoading = true
        await _this.$axios
          .$post(_this.$APIRoutes.addReview, {
            reviewInfo: _this.reviewInfo,
          })
          .then((response) => {
            _this.isAddReviewLoading = false
            if (response && response.TYPE === 'success') {
              // pushing
              _this.showRentInfo.rentreviews.push(response.DATA)
              _this.reviewInfo = {
                rent_id: _this.$route.params.rentId,
                review_comments: '',
                review_stars: 4.5,
              }
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'error')
            }
          })
          .catch((error) => {
            _this.isAddReviewLoading = false
            _this.$toast.error(
              'Something went wrong.Please contact with the administrator',
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addRentError) {
        _this.isAddReviewLoading = false
        _this.$toast.error(
          'Something went wrong.Please contact with the administrator',
          'topRight',
          5000,
          'Error'
        )
      }
    },
    /**
     * Adding Stat
     * @param type
     */
    async addStat(type) {
      let _this = this
      try {
        await _this.$axios
          .$post(_this.$APIRoutes.addStat, {
            type: type,
            id: _this.$route.params.rentId,
          })
          .then((response) => {
            if (response && response.TYPE === 'success') {
              if (type === 'like') {
                _this.showRentInfo.rentstatistics.total_liked++
              } else {
                _this.showRentInfo.rentstatistics.total_wishlisted++
              }
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'error')
            }
          })
          .catch((error) => {
            _this.$toast.error(
              'Something went wrong.Please contact with the administrator',
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addRentError) {
        _this.$toast.error(
          'Something went wrong.Please contact with the administrator',
          'topRight',
          5000,
          'Error'
        )
      }
    },
  },
}
</script>
