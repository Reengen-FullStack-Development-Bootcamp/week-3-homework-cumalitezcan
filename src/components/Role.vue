<template>

    <div class="d-flex align-items-center">
     
      <div class="me-2">
        <select class="user-select text-light" v-model="selected">
          <option class="text-dark font-monospace" value="guest">Guest</option>
          <option class="text-dark font-monospace" value="admin">Admin</option>
        </select>
      </div>
      <div>
       <v-icon @click="AdminPage" class="me-5">mdi-account-tie</v-icon>
      </div>
       <v-app>
      <v-snackbar
      v-model="snackbar"
      color="pink"
      outlined
      :timeout="timeout"
    > {{ text }}
     
     </v-snackbar>
      </v-app>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
      selected: "guest",
      snackbar: false,
      text: 'You are not authorized',
      timeout: 2000,
    };
  },
  methods: {
    AdminPage() {
      if (this.selected == "guest") {
        this.$router.push({ path: "/error" });
        this.snackbar = !this.snackbar
        setTimeout(() => {
          this.$router.push({ path: "/" });
        }, 2000);
      } else if (this.selected == "admin") {
        this.$router.push({ path: "/admin" });
      }
    },
  },
};
</script>

<style></style>
