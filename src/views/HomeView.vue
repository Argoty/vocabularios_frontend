<template>
  <v-container>
    <h2 class="mt-6 text-h5 font-italic text-center">
      <v-icon large>mdi-view-list</v-icon> Lista de Vocabularios
    </h2>
    <v-divider></v-divider>
    <v-row class="mt-5">
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="vocabulario in vocabularios"
        :key="vocabulario.id"
      >
        <v-card max-width="344">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-2 mb-1">
                {{ capitalizeFirstLetter(vocabulario.nombre) }}
              </v-list-item-title>
              <v-list-item-subtitle
                >NÚMERO: {{ vocabulario.numero }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <router-link
              :to="{
                name: 'VocabWords',
                params: { vocabulario_slug: vocabulario.id },
              }"
              class="no-underline"
            >
              <v-btn rounded color="blue lighten-5" class="px-3">
                VER <v-icon class="ml-1">mdi-eye</v-icon></v-btn
              >
            </router-link>
            <router-link
              :to="{
                name: 'PracticarVoc',
                params: { vocabulario_slug: vocabulario.id },
              }"
              class="no-underline"
            >
              <v-btn outlined rounded color="blue darken-2" class="ml-2">
                PRACTICAR <v-icon class="ml-1">mdi-sword-cross</v-icon></v-btn
              >
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <router-link to="/admin/vocabularios" class="no-underline">
        <v-btn rounded color="blue lighten-5" class="px-3">
          ADMIN <v-icon class="ml-1">mdi-eye</v-icon></v-btn
        >
      </router-link>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",

  data() {
    return {
      vocabularios: [],
    };
  },

  created() {
    this.obtenerVocabularios();
  },

  beforeCreate() {
    document.title = "Inicio | Vocabularios";
  },

  methods: {
    async obtenerVocabularios() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/vocabularios/info")
        .then((response) => {
          let vocab_data = response.data;
          vocab_data.sort((a, b) => a.numero - b.numero); // Ordenar array segun numero

          this.vocabularios = vocab_data;
        })
        .catch((err) => {
          this.$store.commit("setSnackbar", {
            status: true,
            message: err,
            type: "error",
          });
        });

      this.$store.commit("setIsLoading", false);
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.toLowerCase().substr(1);
    },
  },
};
</script>

