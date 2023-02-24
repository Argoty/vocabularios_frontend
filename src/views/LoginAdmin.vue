<template>
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
                label="Email de usuario"
                hint="Ejemplo: usuario@gmail.com"
                placeholder="Escribe el email del admin"
                prepend-icon="mdi-account"
                v-model="form.email"
                clearable
                required
                :rules="formRules.email"
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
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "LoginAdmin",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      valid: false,
      see_password: false,

      formRules: {
        email: [
          (v) => !!v || "El email admin es requerido",
          (v) =>
            /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "El email debe ser valido",
        ],
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

      const form = {
        email: this.form.email,
        password: this.form.password,
      };

      try {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } catch (error) {
        let mensajeError;
        switch (error.code) {
          case "auth/user-not-found":
            mensajeError = "Usuario no encontrado";
            break;
          case "auth/wrong-password":
            mensajeError = "Contraseña incorrecta";
            break;
        }
        this.$store.commit("setSnackbar", {
          status: true,
          message: mensajeError,
          type: "error",
        });

        this.$store.commit("setIsLoading", false);
        return;
      }

      const user = auth.currentUser.email;
      this.$store.commit("setUser", { user, stateAuth: true });
      localStorage.setItem("user", user);

      this.$store.commit("setIsLoading", false);
      this.$store.commit("setSnackbar", {
        status: true,
        message: "Login exitosamente del usuario " + user,
        type: "info",
      });
      this.$router.push("/admin/vocabularios");
    },
  },
};
</script>