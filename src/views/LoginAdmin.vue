<!-- <template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" sm="9" md="7">
        <v-card
          class="mt-9"
          :disabled="$store.state.isLoading"
          :loading="$store.state.isLoading"
        >
          <v-form ref="form" v-model="valid" @submit.prevent="submitLogin">
            <v-card-text>
              <v-text-field
                color="primary"
                label="Nombre de usuario"
                hint="Ejemplo: usuario"
                placeholder="Escribe el nombre de usuario admin"
                prepend-icon="mdi-account"
                v-model="form.username"
                clearable
                required
                :rules="formRules.username"
              >
              </v-text-field>

              <v-text-field
                color="primary"
                label="Contraseña"
                hint="Ejemplo: 123456789"
                placeholder="Escribe la contraseña del usuario admin"
                prepend-icon="mdi-lock"
                v-model="form.password"
                required
                clearable
                :type="see_password ? 'text' : 'password'"
                :rules="formRules.password"
                :append-icon="see_password ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="see_password = !see_password"
              >
              </v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="reset" dark>
                Vaciar form <v-icon>mdi-restart</v-icon></v-btn
              >
              <v-btn color="success" type="submit" :disabled="!valid">
                Iniciar Sesión
                <v-icon>mdi-update</v-icon>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginAdmin",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      valid: false,
      see_password: false,

      formRules: {
        username: [(v) => !!v || "El nombre de usuario admin es requerido"],
        password: [(v) => !!v || "La contraseña admin es requerida"],
      },
    };
  },

  created() {
    document.title = "Login Admin | Vocabularios";
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    async submitLogin() {
      this.$store.commit("setIsLoading", true);

      // axios.defaults.headers.common["Authorization"] = "";
      // localStorage.removeItem("token");

      const form = { 
        username: this.form.username,
        password: this.form.password
      };


      await axios
        .post("/usuarios/login", form)
        .then((response) => {
          console.log(response);

          this.form = {};
          this.$refs.form.resetValidation();
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("setSnackbar", {
            status: true,
            message: err,
            type: "error",
          });
        });

      this.$store.commit("setIsLoading", false);
    },
  },
};
</script> -->