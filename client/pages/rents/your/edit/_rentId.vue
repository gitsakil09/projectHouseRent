<template>
  <client-only>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-card-title primary-title class="text-center"
            >Edit Rent</v-card-title
          >
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-form ref="editRentForm">
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          name="House Name"
                          label="House Name *"
                          v-model="editRentInfo.house_name"
                          :rules="[rules.required]"
                          :error-messages="
                            errors &&
                            errors.find(
                              (error) =>
                                error.field === 'editRentInfo.house_name'
                            )
                              ? errors.find(
                                  (error) =>
                                    error.field === 'editRentInfo.house_name'
                                ).message
                              : ''
                          "
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-autocomplete
                          label="Total floors *"
                          :items="floors"
                          v-model="editRentInfo.total_floor_no"
                          item-text="text"
                          item-value="id"
                          :rules="[rules.required]"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-autocomplete
                          label="Rented floor *"
                          :items="floors"
                          v-model="editRentInfo.rented_floor_no"
                          item-text="text"
                          item-value="id"
                          :rules="[rules.required]"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-text-field
                          label="Rented flat *"
                          v-model="editRentInfo.rented_flat_no"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          label="Gas *"
                          :items="[
                            { text: 'Yes', value: 'yes' },
                            { text: 'No', value: 'no' },
                          ]"
                          v-model="editRentInfo.gas_available"
                          item-text="text"
                          item-value="value"
                          :rules="[rules.required]"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          label="Electricity *"
                          :items="[
                            { text: 'Yes', value: 'yes' },
                            { text: 'No', value: 'no' },
                          ]"
                          v-model="editRentInfo.electricity_available"
                          item-text="text"
                          item-value="value"
                          :rules="[rules.required]"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          label="Water *"
                          :items="[
                            { text: 'Yes', value: 'yes' },
                            { text: 'No', value: 'no' },
                          ]"
                          v-model="editRentInfo.water_available"
                          item-text="text"
                          item-value="value"
                          :rules="[rules.required]"
                        ></v-autocomplete>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-textarea
                          name="Address"
                          label="Address *"
                          v-model="editRentInfo.address"
                          :rules="[rules.required]"
                          rows="3"
                          :error-messages="
                            errors &&
                            errors.find(
                              (error) =>
                                error.field === 'editRentInfo.house_name'
                            )
                              ? errors.find(
                                  (error) =>
                                    error.field === 'editRentInfo.house_name'
                                ).message
                              : ''
                          "
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-file-input
                          v-model="pictures"
                          counter
                          label="Pictures *"
                          multiple
                          placeholder="Select Pictures"
                          prepend-icon="mdi-paperclip"
                          :show-size="1000"
                        >
                          <template v-slot:selection="{ index, text }">
                            <v-chip
                              v-if="index < 2"
                              color="deep-purple accent-4"
                              dark
                              label
                              small
                            >
                              {{ text }}
                            </v-chip>
                            <span
                              v-else-if="index === 2"
                              class="overline grey--text text--darken-3 mx-2"
                            >
                              +{{ editRentInfo.pictures.length - 2 }} File(s)
                            </span>
                          </template>
                        </v-file-input>
                        <!-- Showing Pictures -->
                        <v-card>
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
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn
              small
              color="primary"
              :loading="isUpdateRentLoading"
              :disabled="!isValidToUpdate || isUpdateRentLoading"
              @click="updateRent"
            >
              <v-icon class="mr-1" small>mdi-update</v-icon>Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </client-only>
</template>
<script>
export default {
  name: 'ShowEditRent',
  middleware: ['auth'],
  data() {
    return {
      rules: {
        required: (v) => !!v || 'Value Required.',
      },
      isUpdateRentLoading: false,
      editRentInfo: [],
      pictures: [],
      pictureArray: [],
      errors: [],
      users: [],
      floors: [
        { text: 1, id: 1 },
        { text: 2, id: 2 },
        { text: 3, id: 3 },
        { text: 4, id: 4 },
        { text: 5, id: 5 },
        { text: 6, id: 6 },
        { text: 7, id: 7 },
        { text: 8, id: 8 },
        { text: 9, id: 9 },
        { text: 10, id: 10 },
        { text: 11, id: 11 },
        { text: 12, id: 12 },
        { text: 13, id: 13 },
        { text: 14, id: 14 },
        { text: 15, id: 15 },
        { text: 16, id: 16 },
        { text: 17, id: 17 },
        { text: 18, id: 18 },
        { text: 19, id: 19 },
        { text: 20, id: 20 },
        { text: 21, id: 21 },
        { text: 22, id: 22 },
        { text: 23, id: 23 },
      ],
    }
  },
  async mounted() {
    await this.getRentDetail(this.$route.params.rentId)
  },
  computed: {
    /**
     * Checking Validity to add
     */
    isValidToUpdate() {
      if (
        this.editRentInfo.house_name &&
        this.editRentInfo.house_name &&
        this.editRentInfo.total_floor_no &&
        this.editRentInfo.rented_floor_no &&
        this.editRentInfo.rented_flat_no &&
        this.editRentInfo.gas_available &&
        this.editRentInfo.electricity_available &&
        this.editRentInfo.water_available &&
        this.editRentInfo.address &&
        this.editRentInfo.pictures &&
        this.editRentInfo.pictures.length > 0
      ) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    editRentInfo: function () {
      let pictures = this.editRentInfo.pictures
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
          .$get(_this.$APIRoutes.detailRent + '/' + rentId)
          .then((response) => {
            _this.editRentInfo = response
            _this.editRentInfo.gas_available =
              _this.editRentInfo.gas_available === 1 ? 'yes' : 'no'
            _this.editRentInfo.electricity_available =
              _this.editRentInfo.electricity_available === 1 ? 'yes' : 'no'
            _this.editRentInfo.water_available =
              _this.editRentInfo.water_available === 1 ? 'yes' : 'no'
          })
          .catch((error) => {})
      } catch (detailError) {
        console.log(detailError)
      }
    },
    /**
     * Updating Rent
     * @param editRentInfo
     */
    async updateRent() {
      let _this = this
      try {
        _this.isUpdateRentLoading = true
        let formData = new FormData()
        if (_this.pictures && _this.pictures.length > 0) {
          for (const picture of _this.pictures) {
            formData.append('file', picture)
          }
        }
        // appending the other data
        formData.append('rent_id', _this.editRentInfo.id)
        formData.append('house_name', _this.editRentInfo.house_name)
        formData.append('total_floor_no', _this.editRentInfo.total_floor_no)
        formData.append('rented_floor_no', _this.editRentInfo.rented_floor_no)
        formData.append('rented_flat_no', _this.editRentInfo.rented_flat_no)
        formData.append('gas_available', _this.editRentInfo.gas_available)
        formData.append(
          'electricity_available',
          _this.editRentInfo.electricity_available
        )
        formData.append('water_available', _this.editRentInfo.water_available)
        formData.append('address', _this.editRentInfo.address)
        await _this.$axios
          .$post(_this.$APIRoutes.updateRent, formData, {
            headers: {
              'content-type': 'multipart/form-data',
            },
          })
          .then((response) => {
            _this.isUpdateRentLoading = false
            if (response && response.TYPE === 'success') {
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'Success'
              )
              _this.$router.push('/rents/your/list')
            } else {
              _this.$toast.error(response.MESSAGE, 'topRight', 5000, 'error')
            }
          })
          .catch((error) => {
            _this.isUpdateRentLoading = false
            _this.$toast.error(
              'Something went wrong.Please contact with the administrator',
              'topRight',
              5000,
              'Error'
            )
          })
      } catch (addRentError) {
        _this.isUpdateRentLoading = false
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
