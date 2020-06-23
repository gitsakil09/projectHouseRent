<template>
  <client-only>
    <v-layout justify-center align-center>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-card-text>
            <v-layout row wrap offset-md-3>
              <v-flex xs12 sm6 md6>
                <v-card-title primary-title class="text-center"
                  >Search Rent</v-card-title
                >
                <v-text-field
                  name="Search"
                  label="Search anything..."
                  v-model="search"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-divider class="mt-2 mb-2"></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <template
                  v-if="rents && rents instanceof Object && rents.length > 0"
                >
                  <v-card-title primary-title class="text-center"
                    >Rents Based on Search</v-card-title
                  >

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
                    </template></v-data-table
                  >
                </template>
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
      titleTemplate: 'Home | %s',
    }
  },
  data() {
    return {
      search: '',
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
      ],
    }
  },
  async mounted() {
    //await this.getAllRents()
  },
  computed: {},
  watch: {
    search(value) {
      if (value) {
        this.getAllRents()
      }
    },
  },
  methods: {
    /**
     * Getting all rents
     * @param null
     */
    async getAllRents() {
      let _this = this
      try {
        await _this.$axios
          .$get(_this.$APIRoutes.allSearchedRents, {
            params: {
              search: _this.search,
            },
          })
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
