<template>
  <v-app>
    <v-main>
      <v-container class="d-flex">
        <v-card class="pa-4 text-center mx-auto" width="300">
          <form v-if="active === START">
            <v-col>
              <v-btn
                rounded="pill"
                color="primary"
                @click="() => (active = LOGIN)"
                >Log in</v-btn
              >
            </v-col>
            <v-col>
              <v-btn
                rounded="pill"
                color="primary"
                @click="() => (active = REGISTER)"
                >Register</v-btn
              >
            </v-col>
          </form>
          <form v-else-if="active === LOGIN">
            <v-card-title> Log in </v-card-title>
            <v-text-field
              label="email"
              required
              variant="outlined"
              :rules="emailRules"
              v-model="logInData.email"
            />
            <v-text-field
              label="password"
              required
              variant="outlined"
              v-bind="$attrs"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="nameRules"
              @click:append-inner="showPassword = !showPassword"
              v-model="logInData.password"
            />
            <v-row>
              <v-col>
                <v-btn
                  rounded="pill"
                  color="primary"
                  variant="outlined"
                  @click="goBack"
                  >Go back</v-btn
                >
              </v-col>
              <v-col>
                <v-btn rounded="pill" color="success" @click="logIn"
                  >Log in</v-btn
                >
              </v-col>
            </v-row>
          </form>
          <form v-else-if="active === REGISTER">
            <v-card-title> Register </v-card-title>
            <v-text-field
              label="name"
              required
              variant="outlined"
              :rules="nameRules"
              v-model="registerData.name"
            />
            <v-text-field
              label="surname"
              required
              variant="outlined"
              :rules="nameRules"
              v-model="registerData.surname"
            />
            <v-text-field
              label="email"
              required
              variant="outlined"
              :rules="emailRules"
              v-model="registerData.email"
            />
            <v-text-field
              label="password"
              required
              variant="outlined"
              :rules="nameRules"
              v-model="registerData.password"
            />
            <v-row>
              <v-col>
                <v-btn
                  rounded="pill"
                  color="primary"
                  primary
                  variant="outlined"
                  @click="goBack"
                  >Go back</v-btn
                >
              </v-col>
              <v-col>
                <v-btn rounded="pill" color="success" @click="register"
                  >register</v-btn
                >
              </v-col>
            </v-row>
          </form>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "",
});

const START = "start";
const LOGIN = "login";
const REGISTER = "register";
const active = ref(START);
const showPassword = ref(false);
const nameRules = ref([
  (value) => {
    if (value) return true;

    return "Is required.";
  },
]);
const emailRules = ref([
  (value) => {
    if (value) return true;

    return "Is required.";
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;

    return "E-mail must be valid.";
  },
]);
const registerData = ref({
  name: "",
  surname: "",
  email: "",
  password: "",
});
const logInData = ref({
  email: "",
  password: "",
});

const goBack = () => {
  active.value = START;
  registerData.value = {
    name: "",
    surname: "",
    email: "",
    password: "",
  };
  logInData.value = {
    email: "",
    password: "",
  };
};

const register = () => {
  if (Object.values(registerData.value).filter((e) => e !== "")) return;
  console.log(registerData.value);
};
const logIn = () => {
  console.log(logInData.value);
};
</script>
