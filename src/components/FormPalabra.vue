<template>
  <v-card
    :disabled="$store.state.isLoading"
    :loading="palabraEditar.id ? $store.state.isLoading : false"
  >
    <v-form ref="form" v-model="valid" @submit.prevent="submitPalabra">
      <v-card-text>
        <v-text-field
          color="primary"
          label="Palabra"
          hint="Ejemplo: Vocabulary"
          placeholder="Escribe la palabra en ingles"
          prepend-icon="mdi-format-letter-case"
          v-model="palabra_form.palabra"
          clearable
          required
          :rules="formRules.palabra"
        >
        </v-text-field>

        <v-text-field
          color="primary"
          label="Traduccion"
          hint="Ejemplo: Vocabulario"
          placeholder="Escribe la traducción en español de la anterior palabra"
          prepend-icon="mdi-translate"
          v-model="palabra_form.traduccion"
          required
          clearable
          :rules="formRules.traduccion"
        >
        </v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          dark
          v-if="palabraEditar.id"
          @click="$emit('cerrar')"
        >
          Cerrar <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-btn color="primary" @click="reset" dark>
          Vaciar form <v-icon>mdi-restart</v-icon></v-btn
        >
        <v-btn color="success" type="submit" :disabled="!valid">
          {{ !palabraEditar.id ? "Agregar Palabra" : "Editar" }}
          <v-icon>{{
            !palabraEditar.id ? "mdi-plus" : "mdi-update"
          }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
  <script>
export default {
  name: "FormPalabra",
  props: {
    palabraEditar: Object,
  },
  watch: {
    palabraEditar(value) {
      if (value.id) {
        this.palabra_form = { ...value };
      }
    },
  },

  data() {
    return {
      palabra_form: {},
      valid: false,

      formRules: {
        palabra: [(v) => !!v || "La palabra en ingles es requerida"],
        traduccion: [(v) => !!v || "La traducción en español es requerida"],
      },
    };
  },
  created() {
    if (this.palabraEditar.id) {
      this.palabra_form = { ...this.palabraEditar };
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    submitPalabra() {
      const form = { ...this.palabra_form };
      this.palabra_form = {};

      this.$refs.form.resetValidation();
      this.$emit("submit", form);
    },
  },
};
</script>