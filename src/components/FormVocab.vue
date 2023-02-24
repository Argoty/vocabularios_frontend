<template>
  <v-card
    :disabled="$store.state.isLoading"
    :loading="vocabEditar.id ? $store.state.isLoading : false"
  >
    <v-form ref="form" v-model="valid" @submit.prevent="submitVocabulario">
      <v-card-text>
        <v-text-field
          color="primary"
          label="Número"
          hint="Ejemplo: 2.3"
          type="number"
          placeholder="Escribe el número del vocabulario que deseas agregar"
          prepend-icon="mdi-numeric"
          v-model="vocabulario_form.numero"
          clearable
          required
          :rules="formRules.numero"
        >
        </v-text-field>

        <v-text-field
          color="primary"
          label="Nombre"
          hint="Ejemplo: VOCABULARY (VOCABULARIO)"
          placeholder="Escribe el nombre en ingles y español del vocabulario que deseas agregar"
          prepend-icon="mdi-alphabetical-variant"
          v-model="vocabulario_form.nombre"
          required
          clearable
          :rules="formRules.nombre"
        >
        </v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          dark
          v-if="vocabEditar.id"
          @click="$emit('cerrar')"
        >
          <span v-if="showText">Cerrar</span>
          <v-icon :large="!showText">mdi-close</v-icon>
        </v-btn>

        <v-btn color="primary" @click="reset" dark class="pt-1">
          <span v-if="showText">Vaciar form</span>
          <v-icon :large="!showText">mdi-restart</v-icon></v-btn
        >
        <v-btn color="success" type="submit" :disabled="!valid">
          <span v-if="showText">{{
            !vocabEditar.id ? "Agregar Vocabulario" : "Editar"
          }}</span>
          <v-icon :large="!showText">{{
            !vocabEditar.id ? "mdi-format-list-group-plus" : "mdi-update"
          }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: "FormVocab",
  props: {
    vocabEditar: Object,
  },

  data() {
    return {
      vocabulario_form: {},
      valid: false,

      formRules: {
        numero: [(v) => !!v || "Numero es requerido"],
        nombre: [(v) => !!v || "Nombre es requerido"],
      },

      showText: true,
    };
  },
  created() {
    if (this.vocabEditar.id) {
      this.vocabulario_form = { ...this.vocabEditar };
    }
  },

  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint.width;
    },
  },

  watch: {
    vocabEditar(value) {
      if (value.id) {
        this.vocabulario_form = { ...value };
      }
    },
    breakpoint(val) {
      if (val < 800) {
        this.showText = false;
      } else {
        this.showText = true;
      }
    },
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    submitVocabulario() {
      const form = { ...this.vocabulario_form };
      this.vocabulario_form = {};

      this.$refs.form.resetValidation();
      this.$emit("submit", form);
    },
  },
};
</script>


<style scoped>
span {
  display: none;
}

@media (min-width: 800px) {
  span {
    display: block;
  }
}
</style>
