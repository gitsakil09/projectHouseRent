<template>
  <client-only>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        List of all available Rents List
      </v-flex>
    </v-layout>
  </client-only>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      loginDialog: false,
    }
  },
}
</script>
