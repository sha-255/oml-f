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
        @click="sync"
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-microsoft-excel"
        title="Excel load"
        slim
        @click="loadExcel"
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
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const drawer = ref(true);
const rail = ref(false);
const currentLang = ref("en");

const router = useRouter();

const sync = () => {};

const loadExcel = () => {};

const changeLang = () => {};
</script>
