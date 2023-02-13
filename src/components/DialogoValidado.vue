<template>
    <v-dialog v-model="dialogo_obj.state" width="550px" persistent>
      <v-card class="pa-2">
        <v-card-title class="d-flex justify-center">
          <span class="text-h6 font-weight-medium"
            >{{ dialogo_obj.texto }}
            <v-icon large color="yellow darken-2">{{
              dialogo_obj.todo_ok
                ? "mdi-emoticon-happy"
                : "mdi-emoticon-sad"
            }}</v-icon></span
          >
        </v-card-title>
        <v-card-actions class="d-flex justify-center mr-5">
          <v-btn
            color="red darken-1"
            dark
            @click="$emit('cerrar')"
          >
            Cerrar <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "DialogoValidado",
    props: { 
        dialogo_obj: Object
    }
}
</script>