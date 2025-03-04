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
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const drawer = ref(true);
const rail = ref(false);

const router = useRouter();
</script>
