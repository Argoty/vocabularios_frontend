<template>
  <v-container>
    <h2 class="font-weight-black text-center text-h6">
      <b>ADMIN VOCABULARIO N° {{ vocabulario_info.numero }}</b>
      <v-icon large color="primary">mdi-cog</v-icon>
    </h2>
    <p class="font-weight-bold text-center text-subtitle-2">
      {{ vocabulario_info.nombre }}
    </p>

    <FormPalabra
      @submit="agregarPalabra"
      class="mt-5"
      :palabraEditar="{}"
      v-if="vocabulario_info.id"
    />

    <v-card class="mt-5" :disabled="$store.state.isLoading">
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
        :headers="headers"
        :items="palabras"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                class="mr-1"
                dark
                title="Actualizar Palabra"
                rounded
                small
                v-bind="attrs"
                v-on="on"
                @click="
                  dialogoEditar = { state: true, objetoEditar: { ...item } }
                "
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Actualizar Vocabulario</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="red accent-2"
                dark
                title="Eliminar Palabra"
                class="mr-1"
                rounded
                small
                v-bind="attrs"
                v-on="on"
                @click="
                  dialogoEliminar = {
                    state: true,
                    cosaEliminada: `la palabra '${item.palabra}'`,
                    id_cosaEliminada: item.id,
                  }
                "
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Eliminar Vocabulario</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <DialogoEliminar
      :dialogo_obj="dialogoEliminar"
      @no="
        dialogoEliminar = {
          state: false,
          cosaEliminada: '',
          id_cosaEliminada: '',
        }
      "
      @si="eliminarPalabra"
    />

    <v-dialog v-model="dialogoEditar.state" width="600px" persistent>
      <FormPalabra
        @submit="editarPalabra"
        :palabraEditar="dialogoEditar.objetoEditar"
        @cerrar="dialogoEditar = { state: false, objetoEditar: {} }"
      />
    </v-dialog>
  </v-container>
</template>
  
  <script>
import axios from "axios";
import DialogoEliminar from "@/components/DialogoEliminar.vue";
import FormPalabra from "@/components/FormPalabra.vue";

export default {
  name: "AdminPalabras",
  components: {
    DialogoEliminar,
    FormPalabra,
  },
  data() {
    return {
      vocabulario_info: {},
      palabras: [],
      search: "",

      headers: [
        {
          text: "Número",
          align: "center",
          value: "nro",
        },
        { text: "Palabra", value: "palabra", align: "center" },
        { text: "Traducción", value: "traduccion", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ],

      dialogoEliminar: {
        state: false,
        cosaEliminada: "",
        id_cosaEliminada: "",
      },

      dialogoEditar: {
        state: false,
        objetoEditar: {},
      },
    };
  },

  async created() {
    await this.obtenerPalabras_vocabulario();
    document.title = this.vocabulario_info.id
      ? `Admin V N° ${this.vocabulario_info.numero} | Vocabularios`
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

      await this.obtenerPalabras(id_vocabulario);

      this.$store.commit("setIsLoading", false);
    },

    async obtenerPalabras(id_vocabulario) {
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
    },

    async agregarPalabra(palabra_form) {
      this.$store.commit("setIsLoading", true);

      palabra_form.id_vocabulario = this.vocabulario_info.id;

      await axios
        .post("/palabras", palabra_form)
        .then(async (response) => {
          await this.obtenerPalabras(this.vocabulario_info.id);

          this.$store.commit("setSnackbar", {
            status: true,
            message: `Se acaba de agregar la palabra ${response.data.palabra}`,
            type: "info",
          });
        })
        .catch((err) => {
          this.ponerError(err.response.data.detail);
        });

      this.$store.commit("setIsLoading", false);
    },

    async eliminarPalabra(id_palabra) {
      this.$store.commit("setIsLoading", true);

      await axios
        .delete(`/palabras/${id_palabra}`)
        .then(async (response) => {
          await this.obtenerPalabras(this.vocabulario_info.id);

          this.$store.commit("setSnackbar", {
            status: true,
            message: "¡Se eliminó la palabra correctamente!",
            type: "info",
          });
        })
        .catch((err) => {
          this.ponerError(err.response.data.detail);
        });

      this.dialogoEliminar = {
        state: false,
        cosaEliminada: "",
        id_cosaEliminada: "",
      };

      this.$store.commit("setIsLoading", false);
    },

    async editarPalabra(form_palabra) {
      this.$store.commit("setIsLoading", true);

      await axios
        .put("/palabras", form_palabra)
        .then(async (response) => {
          await this.obtenerPalabras(this.vocabulario_info.id);

          this.$store.commit("setSnackbar", {
            status: true,
            message: `Se acaba de editar la palabra ${response.data.palabra}`,
            type: "info",
          });
        })
        .catch((err) => {
          this.$store.commit("setSnackbar", {
            status: true,
            message: err.response.data.detail,
            type: "error",
          });
        });

      this.dialogoEditar = {
        state: false,
        objetoEditar: {},
      };

      this.$store.commit("setIsLoading", false);
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