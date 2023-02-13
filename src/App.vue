<template>
  <v-app>
    <Navbar />

    <v-main>
      <v-row class="justify-center">
        <v-col cols="2">
          <v-progress-circular
            v-if="$store.state.isLoading"
            class="mx-auto mt-5"
            :size="100"
            :width="10"
            color="blue darken-5"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
      <router-view />
    </v-main>

    <Footer />
    <Snackbar />
  </v-app>
</template>

<script>
import Navbar from "./views/Navbar.vue";
import Snackbar from "./components/Snackbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Snackbar,
    Footer
  },

  data: () => ({
    //
  }),

  
};
</script>

<style>
.no-underline {
  text-decoration: none;
}
</style>
