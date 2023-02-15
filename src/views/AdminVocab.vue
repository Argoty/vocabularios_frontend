<template>
  <v-container>
    <h2 class="font-weight-black text-center text-h6">
      <b>ADMIN VOCABULARIOS</b>
      <v-icon large color="primary">mdi-cog</v-icon>
    </h2>

    <FormVocab @submit="agregarVocabulario" class="mt-5" :vocabEditar="{}" />

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
        :items="vocabularios_data"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                class="mr-1"
                dark
                title="Actualizar Vocabulario"
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
                title="Eliminar Vocabulario"
                class="mr-1"
                rounded
                small
                v-bind="attrs"
                v-on="on"
                @click="
                  dialogoEliminar = {
                    state: true,
                    cosaEliminada: `el vocabulario N° ${item.numero}`,
                    id_cosaEliminada: item.id,
                  }
                "
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Eliminar Vocabulario</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <router-link
                :to="{
                  name: 'AdminPalabras',
                  params: { vocabulario_slug: item.id },
                }"
                class="no-underline"
              >
                <v-btn
                  color="blue"
                  dark
                  title="Añadir Palabras"
                  rounded
                  small
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </router-link>
            </template>
            <span>Añadir palabras</span>
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
      @si="eliminarVocabulario"
    />

    <v-dialog v-model="dialogoEditar.state" width="600px" persistent>
      <FormVocab
        @submit="editarVocabulario"
        :vocabEditar="dialogoEditar.objetoEditar"
        @cerrar="dialogoEditar = { state: false, objetoEditar: {} }"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import FormVocab from "@/components/FormVocab.vue";
import DialogoEliminar from "@/components/DialogoEliminar.vue";

export default {
  name: "AdminVocab",
  components: {
    FormVocab,
    DialogoEliminar,
  },
  data() {
    return {
      vocabularios_data: [],
      headers: [
        {
          text: "Número",
          align: "center",
          value: "numero",
        },
        { text: "Vocabulario", value: "nombre", align: "center" },
        { text: "Actions", value: "actions", sortable: false, align: "center" },
      ],

      search: "",

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

  created() {
    this.obtenerVocabularios();
  },

  beforeCreate() {
    document.title = "Admin | Vocabularios";
  },

  methods: {
    async agregarVocabulario(form) {
      this.$store.commit("setIsLoading", true);

      await axios
        .post("/vocabularios", form)
        .then(async (response) => {
          await this.obtenerVocabularios();

          this.$store.commit("setSnackbar", {
            status: true,
            message: `Se acaba de agregar el vocabulario N° ${response.data.numero}`,
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

      this.$store.commit("setIsLoading", false);
    },

    async obtenerVocabularios() {
      this.$store.commit("setIsLoading", true);

      await axios
        .get("/vocabularios/info")
        .then((response) => {
          let vocab_data = response.data;
          vocab_data.sort((a, b) => a.numero - b.numero); // Ordenar array segun numero
          vocab_data.forEach(v => v.nombre = this.capitalizeFirstLetter(v.nombre))
          
          this.vocabularios_data = vocab_data;
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

    async eliminarVocabulario(id_vocabulario) {
      this.$store.commit("setIsLoading", true);

      await axios
        .delete(`/vocabularios/${id_vocabulario}`)
        .then(async (response) => {
          await this.obtenerVocabularios();

          this.$store.commit("setSnackbar", {
            status: true,
            message: "¡Se eliminó el vocabulario correctamente!",
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

      this.dialogoEliminar = {
        state: false,
        cosaEliminada: "",
        id_cosaEliminada: "",
      };

      this.$store.commit("setIsLoading", false);
    },

    async editarVocabulario(form) {
      this.$store.commit("setIsLoading", true);

      await axios
        .put("/vocabularios", form)
        .then(async (response) => {
          await this.obtenerVocabularios();

          this.$store.commit("setSnackbar", {
            status: true,
            message: `Se acaba de editar el vocabulario N° ${response.data.numero}`,
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

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.toLowerCase().substr(1);
    },
  },
};
</script>