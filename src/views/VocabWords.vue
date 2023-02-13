<template>
  <v-container>
    <h2 class="font-weight-black text-center text-h6">
      <b>{{ vocabulario_info.numero }}</b> {{ vocabulario_info.nombre }}
    </h2>
    
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar palabra"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </v-card-title>

      <v-data-table
        class="mt-4"
        :loading="$store.state.isLoading"
        :headers="headers"
        :items="palabras"
        :search="search"
      >
      </v-data-table>
    </v-card>

    <router-link
      :to="{
        name: 'PracticarVoc',
        params: { vocabulario_slug: vocabulario_info.id },
      }"
      class="no-underline"
    >
      <v-btn outlined rounded color="blue darken-2" class="mt-5" v-if="!$store.state.isLoading">
        PRACTICAR <v-icon class="ml-1">mdi-sword-cross</v-icon></v-btn
      >
    </router-link>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "VocabWords",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nro",
          align: "center",
          value: "nro",
        },
        { text: "Palabra", value: "palabra", align: "center" },
        { text: "Traducción", value: "traduccion", align: "center" },
      ],
      palabras: [],
      vocabulario_info: {},
    };
  },

  async created() {
    await this.obtenerPalabras_vocabulario();
    document.title = this.vocabulario_info.id
      ? `${this.vocabulario_info.nombre} | Vocabularios`
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
          let data = response.data;
          data.forEach((p, i) => {
            p.nro = i + 1;
          });

          this.palabras = [...data];
        })
        .catch((err) => {
          !this.$store.state.snackbar.status
            ? this.ponerError(err.response.data.detail)
            : console.log(err);
        });

      this.$store.commit("setIsLoading", false);
    },

    ponerError(message) {
      this.$store.commit("setSnackbar", {
        status: true,
        message,
        type: "error"
      });
    },
  },
};
</script>