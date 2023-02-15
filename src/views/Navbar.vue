<template>
  <v-app-bar app color="blue lighten-5">
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../assets/logo_vocabularios.png"
        transition="scale-transition"
        width="40"
      />
      <router-link to="/" class="no-underline">
        <h1 class="v-responsive font-size-12">Vocabularios</h1>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/JaxisArty/vocabularios_frontend"
      target="_blank"
      text
    >
      <span class="mr-2" v-if="showText">Ultima actualizacion</span>
      <v-icon :large="!showText">mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      showText: true
    }
  },
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint.width
    }
  },
  watch: {
    breakpoint(val) {
      if (val < 700) {
        this.showText = false
      } else {
        this.showText = true
      }
    }
  }
};
</script>

<style scoped>
.v-responsive.font-size-12 {
  font-size: 2rem !important;
}

@media (max-width: 550px) {
  .v-responsive.font-size-12 {
    font-size: 1.4rem !important;
  }
}

span {
  display: none;
}

@media (min-width: 700px) {
  span {
    display: block;
  }
}
</style>

