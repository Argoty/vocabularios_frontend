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
      href="https://github.com/JaxisArty/vocabularios_frontend"
      target="_blank"
      text
    >
      <span class="mr-2">Ultima actualizacion</span>
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
    name: "Navbar"
}
</script>