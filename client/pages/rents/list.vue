<template>
  <client-only>
    <v-layout justify-center align-center>
      <v-flex xs12 sm10 md10>
        <v-card>
          <v-card-title primary-title class="text-center"
            >List of all available Rents List</v-card-title
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
                  <!-- Owner -->
                  <template v-slot:item.user_id="{ item }">
                    {{ item && item.users ? item.users.username : '--' }}
                  </template>
                  <!-- RegTime -->
                  <template v-slot:item.RegTime="{ item }">
                    {{ item && item.created_at ? item.created_at : '--' }}
                  </template>
                  <!-- Action -->
                  <template v-slot:item.Action="{ item }">
                    <v-btn
                      small
                      color="primary"
                      title="Detail"
                      @click="$router.push('/rents/show/' + item.id)"
                      ><v-icon small>mdi-logout</v-icon></v-btn
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
  name: 'MainPage',
  head() {
    return {
      titleTemplate: 'Rent Lists | %s',
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
          text: 'Owner',
          value: 'user_id',
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
        // {
        //   text: 'Gas',
        //   value: 'gas_available',
        //   align: 'center',
        //   sortable: false,
        // },
        // {
        //   text: 'Electricity',
        //   value: 'electricity_available',
        //   align: 'center',
        //   sortable: false,
        // },
        // {
        //   text: 'Water',
        //   value: 'water_available',
        //   align: 'center',
        //   sortable: false,
        // },
      ],
    }
  },
  async mounted() {
    await this.getAllRents()
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * Getting all rents
     * @param null
     */
    async getAllRents() {
      let _this = this
      try {
        await _this.$axios
          .$get(_this.$APIRoutes.allRents)
          .then((response) => {
            _this.rents = response
          })
          .catch((error) => {})
      } catch (rentsError) {
        console.log(rentsError)
      }
    },
  },
}
</script>
