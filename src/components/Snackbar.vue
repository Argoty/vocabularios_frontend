<template>
  <v-snackbar
    v-model="$store.state.snackbar.status"
    :color="
      $store.state.snackbar.type == 'error'
        ? 'red darken-1'
        : $store.state.snackbar.type == 'info'
        ? 'success'
        : ''
    "
    shaped
  >
    <h3>
      {{ $store.state.snackbar.message }}
      <v-icon>{{
        $store.state.snackbar.type == "error"
          ? "mdi-database-alert"
          : $store.state.snackbar.type == "info"
          ? "mdi-database-check"
          : ""
      }}</v-icon>
    </h3>

    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        icon
        @click="$store.commit('setSnackbar', { status: false, message: '', type:'' })"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
};
</script>