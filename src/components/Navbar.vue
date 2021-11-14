<template>
  <v-container>
    <v-row>
      <v-app-bar dense shaped dark>
        <router-link :to="{ name: 'Home' }">
         <button class="btn btn-outline-light rounded-pill">Home</button>
        </router-link>
        <v-spacer></v-spacer>
        <!-- <v-icon class="me-5">mdi-account-tie</v-icon> -->
        <Role />
      </v-app-bar>
    </v-row>
  </v-container>
</template>

<script>
import Role from "./Role.vue";
export default {
  name: "Navbar",
  components: {
    Role,
  },
};
</script>
