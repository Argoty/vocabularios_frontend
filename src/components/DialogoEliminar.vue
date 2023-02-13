<template>
  <v-dialog v-model="dialogo_obj.state" width="550px" persistent>
    <v-card
      class="pa-2"
      :loading="$store.state.isLoading"
      :disabled="$store.state.isLoading"
    >
      <v-card-title class="d-flex justify-center">
        <span class="text-h6"
          >¿Estás seguro de eliminar {{ dialogo_obj.cosaEliminada }}?</span
        >
      </v-card-title>
      <v-card-actions class="d-flex justify-center mr-5">
        <v-btn color="red darken-1" dark @click="$emit('no')">
          No <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          color="success"
          @click="$emit('si', dialogo_obj.id_cosaEliminada)"
        >
          Si <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogoEliminar",
  props: {
    dialogo_obj: Object,
  },
};
</script>