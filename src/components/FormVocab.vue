<template>
  <v-card :disabled="$store.state.isLoading" :loading="vocabEditar.id ? $store.state.isLoading : false">
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
        <v-btn color="red darken-1" dark v-if="vocabEditar.id" @click="$emit('cerrar')">
          Cerrar <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-btn color="primary" @click="reset" dark>
          Vaciar form <v-icon>mdi-restart</v-icon></v-btn
        >
        <v-btn color="success" type="submit" :disabled="!valid">
          {{ !vocabEditar.id ? "Agregar Vocabulario" : "Editar"}} <v-icon>{{ !vocabEditar.id ? "mdi-format-list-group-plus" : "mdi-update"}}</v-icon
          >
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: "FormVocab",
  props: {
    vocabEditar: Object
  },
  watch: {
    vocabEditar(value) {
      if (value.id) {
        this.vocabulario_form = {...value};
      }
    }
  },

  data() {
    return {
      vocabulario_form: {},
      valid: false,

      formRules: {
        numero: [(v) => !!v || "Numero es requerido"],
        nombre: [(v) => !!v || "Nombre es requerido"],
      },
    };
  },
  created() {
    if (this.vocabEditar.id) {
      this.vocabulario_form = {...this.vocabEditar};
    }
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