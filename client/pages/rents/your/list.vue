<template>
  <client-only>
    <v-layout justify-center align-center>
      <v-flex xs12 sm10 md10>
        <v-card>
          <v-card-title primary-title class="text-center"
            >List of Your Rents List</v-card-title
          >
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-data-table
                  :headers="rentHeaders"
                  :items="rents"
                  class="elevation-0"
                >
                  <!-- Serial -->
                  <template v-slot:item.SL="{ item }">
                    {{ rents.map((rent) => rent.id).indexOf(item.id) + 1 }}
                  </template>
                  <!-- RegTime -->
                  <template v-slot:item.RegTime="{ item }">
                    {{ item && item.created_at ? item.created_at : '--' }}
                  </template>
                  <!-- Action -->
                  <template v-slot:item.Action="{ item }">
                    <v-btn
                      x-small
                      color="success"
                      title="Detail"
                      @click="$router.push('/rents/show/' + item.id)"
                      ><v-icon x-small>mdi-logout</v-icon></v-btn
                    >
                    <v-btn
                      x-small
                      color="primary"
                      title="Edit"
                      @click="$router.push('/rents/your/edit/' + item.id)"
                      ><v-icon small>mdi-pencil</v-icon></v-btn
                    >
                    <v-btn
                      x-small
                      color="red"
                      title="Delete"
                      @click="deleteRent(item.id)"
                      ><v-icon x-small color="white">mdi-delete</v-icon></v-btn
                    >
                  </template>
                </v-data-table>
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
  name: 'YourRentList',
  middleware: ['auth'],
  head() {
    return {
      titleTemplate: 'Your Rents | %s',
    }
  },
  data() {
    return {
      rents: [],
      rentHeaders: [
        {
          text: 'SL',
          value: 'SL',
          align: 'center',
          sortable: false,
        },
        {
          text: 'House Name',
          value: 'house_name',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Total Floors',
          value: 'total_floor_no',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Rented Floor',
          value: 'rented_floor_no',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Rented Flat',
          value: 'rented_flat_no',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Add Date',
          value: 'RegTime',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Action',
          value: 'Action',
          align: 'center',
          sortable: false,
        },
      ],
    }
  },
  async mounted() {
    await this.getAllYourRents()
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * Getting all rents
     * @param null
     */
    async getAllYourRents() {
      let _this = this
      try {
        await _this.$axios
          .$get(_this.$APIRoutes.allYourRents)
          .then((response) => {
            _this.rents = response
          })
          .catch((error) => {})
      } catch (rentsError) {
        console.log(rentsError)
      }
    },
    /**
     * Deleting Rent
     * @param rentId
     */
    async deleteRent(rentId) {
      let _this = this
      try {
        await _this.$axios
          .$post(_this.$APIRoutes.deleteRent, {
            id: rentId,
          })
          .then((response) => {
            if (response && response.TYPE === 'success') {
              const findIndex = _this.rents
                .map((rent) => rent.id)
                .indexOf(rentId)
              if (findIndex > -1) {
                _this.rents.splice(findIndex, 1)
              }
              _this.$toast.success(
                response.MESSAGE,
                'topRight',
                5000,
                'success'
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
      } catch (rentsError) {
        console.log(rentsError)
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
