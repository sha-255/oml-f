<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <v-list-item nav>
      <template v-slot:append>
        <v-btn
          :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          variant="text"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-database"
        title="Software"
        value="software"
        @click="() => router.push('/')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-desktop-classic"
        title="Devices"
        value="devices"
        @click="() => router.push('/devices')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-folder-multiple"
        title="Licenses"
        value="licenses"
        @click="() => router.push('/licenses')"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        prepend-icon="mdi-cloud-refresh"
        title="Sync"
        slim
        :disabled="isSyncing"
        :loading="isSyncing"
        @click="sync"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-microsoft-excel"
        title="Excel load"
        slim
        @click="isExcelModalOpen = true"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-earth"
        :title="'Language: ' + currentLang"
        slim
        @click="changeLang"
      >
      </v-list-item>
    </v-list>

    <v-dialog v-model="isExcelModalOpen" max-width="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Uploading an Excel file</span>
          <v-btn icon="mdi-close" variant="text" @click="closeModal"></v-btn>
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="handleSubmit">
            <v-file-input
              v-model="selectedFile"
              accept=".xlsx,.xls"
              label="Select an Excel file"
              :disabled="isLoading"
              :error-messages="error"
              @change="onFileChange"
            ></v-file-input>

            <v-btn
              type="submit"
              color="primary"
              :disabled="isLoading || !selectedFile"
              :loading="isLoading"
              block
              class="mt-4"
            >
              Upload
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useSessionStore } from "~/stores/session-store";

const drawer = ref(true);
const rail = ref(false);
const currentLang = ref("en");
const isExcelModalOpen = ref(false);
const selectedFile = ref<File | null>(null);
const isLoading = ref(false);
const isSyncing = ref(false);
const error = ref("");

const router = useRouter();
const session = useSessionStore();
const config = useRuntimeConfig();
const accessToken = computed(() => session.accessToken);

const sync = async () => {
  isSyncing.value = true;

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

  try {
    await $fetch(`${config.public.endpoint}/api/sync-licence`, {
      method: "POST",
      headers: myHeaders,
    });
  } catch (err) {
    console.error("Synchronization error:", err);
  } finally {
    isSyncing.value = false;
  }
};

const changeLang = () => {};

const closeModal = () => {
  isExcelModalOpen.value = false;
  selectedFile.value = null;
  error.value = "";
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    selectedFile.value = input.files[0];
  } else {
    selectedFile.value = null;
  }
};

const handleSubmit = async () => {
  if (!selectedFile.value) {
    error.value = "Please select the file";
    return;
  }

  isLoading.value = true;
  error.value = "";

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken.value}`);

  try {
    const response = await $fetch(
      `${config.public.endpoint}/api/import-excel`,
      {
        method: "POST",
        headers: myHeaders,
        body: formData,
      }
    );

    console.log("The file was uploaded successfully:", response);
    closeModal();
  } catch (err) {
    if (err.response?.status === 401) {
      session.logOut();
    }
    error.value = err.response?.data?.message || "Error when uploading a file";
  } finally {
    isLoading.value = false;
  }
};
</script>
