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
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :rules="passwordRules"
              @click:append-inner="showPassword = !showPassword"
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
        <v-dialog v-model="dialog" width="auto">
          <v-card
            max-width="400"
            prepend-icon="mdi-alert"
            text="Check the correctness of the filled-in data."
            title="Verification"
          >
            <template v-slot:actions>
              <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useSessionStore } from "~/stores/session-store";

definePageMeta({
  layout: "",
});

const START = "start";
const LOGIN = "login";
const REGISTER = "register";

const router = useRouter();
const session = useSessionStore();

const active = ref(START);
const dialog = ref(false);
const showPassword = ref(false);
const nameRules = ref([
  (value: string) => {
    if (value) return true;

    return "Is required.";
  },
]);
const emailRules = ref([
  (value: string) => {
    if (value) return true;

    return "Is required.";
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true;

    return "E-mail must be valid.";
  },
]);
const passwordRules = ref([
  (value: string) => {
    if (value) return true;

    return "Is required.";
  },
  (value: string) => {
    if (value.length > 6) return true;

    return "Minimum of 6 characters.";
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
  showPassword.value = false;
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

watch(dialog, (value: boolean) => {
  if (value) {
    showPassword.value = false;
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
  }
});

const register = async () => {
  if (Object.values(registerData.value).filter((e) => e === "").length) return;
  const result = await session.register(registerData.value);
  console.log(result);
  if (result.token) {
    router.push("/");
  }
};

const logIn = async () => {
  try {
    if (Object.values(logInData.value).filter((e) => e === "").length) return;
    const result = await session.logIn(logInData.value);
    console.log(result);
    if (result.token) {
      router.push("/");
      return;
    }
    dialog.value = true;
  } catch {
    dialog.value = true;
  }
};
</script>
