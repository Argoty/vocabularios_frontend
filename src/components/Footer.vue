<template>
  <v-footer dark padless class="mt-5">
    <v-card
      flat
      tile
      width="100%"
      class="blue-grey darken-4 white--text text-center"
    >
      <v-card-text class="pt-1">
        <v-btn
          v-for="(icon, index) of icons"
          :href="icon.url"
          :title="icon.title"
          :alt="icon.title"
          target="_blank"
          :key="index"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">
            {{ icon.name }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Página web que contiene distintos vocabularios de ingles para verlos y
        tambien poder practicarlos y asi lograr mejorar tu vocabulario en
        ingles, hecha con Las tecnologias Vue Js, Vuetify y usando una API
        propia hecha en fastapi:
        <a
          href="https://vocabulariosingles-fastapi.onrender.com/docs"
          target="_BLANK"
          class="white--text"
          >Vocabularios Argoty</a
        >
        <b> Contactame en: jaxis0810@gmail.com</b>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>Javier Leonardo Argoty Roa</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      icons: [
        {
          name: "mdi-youtube",
          url: "https://www.youtube.com/channel/UC0B12cT3xLHX1UV7AGYfZ1g",
          title: "Youtube",
        },
        {
          name: "mdi-facebook",
          url: "https://www.facebook.com/javier.argoty.3",
          title: "Facebook",
        },
        {
          name: "mdi-instagram",
          url: "https://www.instagram.com/javier.argoty/",
          title: "Instagram",
        },
      ],
    };
  },
};
</script>

