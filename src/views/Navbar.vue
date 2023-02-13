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
        <h1>Vocabularios</h1>
      </router-link>
      
    </div>

    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
    >
      <span class="mr-2">Latest Release</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
    name: "Navbar"
}
</script>