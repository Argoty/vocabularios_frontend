<template>
  <v-container v-if="!$store.state.isLoading">
    <h2 class="font-weight-black text-center text-h6">
      ¡PRACTICA EL VOCABULARIO!
      <v-icon class="ml-1" large color="primary">mdi-sword-cross</v-icon>
    </h2>
    <v-divider></v-divider>
    <b>{{ vocabulario_info.numero }}</b> {{ vocabulario_info.nombre }}
    <p class="mt-2 font-weight-medium text-body-2">
      Escribe la traduccion de las palabras y al final le das al boton para
      evaluarlas.
    </p>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="vocabulario in data"
        :key="vocabulario.id"
      >
        <v-text-field
          v-model="palabras_model[vocabulario.traduccion]"
          :clearable="!practica_validada"
          :readonly="practica_validada"
          color="primary"
          :label="vocabulario.traduccion"
          :error="errores[vocabulario.traduccion]"
          @input="errores[vocabulario.traduccion] = false"
          :success="
            !errores[vocabulario.traduccion] && practica_validada ? true : false
          "
          :append-icon="
            errores[vocabulario.traduccion]
              ? 'mdi-alpha-x-circle'
              : !errores[vocabulario.traduccion] && practica_validada
              ? 'mdi-check-bold'
              : ''
          "
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="data.length > 0">
      <v-btn
        rounded
        color="success"
        class="px-3"
        @click="evaluar"
        :disabled="practica_validada"
        >EVALUAR <v-icon class="ml-1">mdi-check-all</v-icon></v-btn
      >
      <v-btn rounded color="primary" class="px-3 ml-3" @click="reiniciar"
        >REINICIAR <v-icon>mdi-restart</v-icon></v-btn
      >
      <router-link
        :to="{
          name: 'VocabWords',
          params: { vocabulario_slug: vocabulario_info.id },
        }"
        class="no-underline"
      >
        <v-btn rounded color="blue lighten-5" class="px-3 ml-3">
          VER <v-icon class="ml-1">mdi-eye</v-icon></v-btn
        >
      </router-link>
    </v-row>

    <DialogoValidado
      :dialogo_obj="dialogo_validado"
      @cerrar="dialogo_validado = { state: false, texto: '', todo_ok: false }"
    />
  </v-container>
</template>
  
  <script>
import axios from "axios";
import DialogoValidado from "@/components/DialogoValidado.vue";

export default {
  name: "PracticarVoc",
  components: {
    DialogoValidado,
  },
  data() {
    return {
      data: [],

      vocabulario_info: {},
      palabras_model: {},
      errores: {},

      practica_validada: false,
      dialogo_validado: {
        state: false,
        texto: "",
        todo_ok: false,
      },
    };
  },
  async created() {
    await this.obtenerPalabras_vocabulario();
    document.title = this.vocabulario_info.id
      ? `Practica N° ${this.vocabulario_info.numero} | Vocabularios`
      : "No encontrado | Vocabularios";
  },
  methods: {
    async obtenerPalabras_vocabulario() {
      this.$store.commit("setIsLoading", true);

      let id_vocabulario = this.$route.params.vocabulario_slug;

      await axios
        .get(`/vocabularios/info/${id_vocabulario}`)
        .then((response) => {
          this.vocabulario_info = response.data;
        })
        .catch((err) => {
          this.ponerError(err.response.data.detail);
        });

      await axios
        .get(`/vocabularios/${id_vocabulario}`)
        .then((response) => {
          this.data = response.data;

          // let errores = {};

          // this.data.forEach((v) => {
          //   errores[v.traduccion] = false;
          // });

          // this.errores = { ...errores };
        })
        .catch((err) => {
          !this.$store.state.snackbar.status
            ? this.ponerError(err.response.data.detail)
            : console.log(err);
        });

      this.$store.commit("setIsLoading", false);
    },

    evaluar() {
      let resultados = { ...this.palabras_model };
      let palabras_traducidas = {};
      let algun_error = false;
      let nro_errores = 0;

      this.data.forEach((v) => {
        palabras_traducidas[v.traduccion] = v.palabra;
      });

      Object.keys(palabras_traducidas).forEach((k) => {
        if (resultados[k] != palabras_traducidas[k]) {
          algun_error = true;

          this.errores[k] = true;
          this.palabras_model[k] = `${resultados[k] || ""} ( correcta: ${
            palabras_traducidas[k]
          } )`;

          nro_errores++;
        }
      });

      this.practica_validada = true;
      this.dialogo_validado.state = true;

      if (algun_error) {
        this.dialogo_validado.texto = `¡Vaya! Tuviste ${nro_errores} errores de ${this.data.length}, sigue intentando`;
        this.dialogo_validado.todo_ok = false;
      } else {
        this.dialogo_validado.texto =
          "!Excelente, Acertaste todas las palabras, sigue asi!";
        this.dialogo_validado.todo_ok = true;
      }
    },

    reiniciar() {
      this.errores = {};
      this.palabras_model = {};
      this.practica_validada = false;
    },

    ponerError(message) {
      this.$store.commit("setSnackbar", {
        status: true,
        message,
        type: "error",
      });
    },
  },
};
</script>