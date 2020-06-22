<template>
  <client-only>
    <v-layout justify-center align-center>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-card-title primary-title class="text-center">
            List of all available Rents List
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-data-table
                  :headers="rentHeaders"
                  :items="rents"
                  hide-default-footer
                  class="elevation-0"
                >
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
          value: 'OwnerName',
          align: 'center',
          sortable: false,
        },
        {
          text: 'House Name',
          value: 'HouseName',
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
          text: 'Address',
          value: 'address',
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
}
</script>
