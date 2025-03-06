<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        color="primary"
        variant="outlined"
        :loading="loading"
        v-bind="activatorProps"
      >
        Update
      </v-btn>
    </template>
    <v-card prepend-icon="mdi-folder-arrow-left-right" title="Update device">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Name*"
              required
              v-model="data.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Type*"
              required
              v-model="data.type"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Location*"
              required
              v-model="data.location"
            ></v-text-field>
          </v-col>
        </v-row>
        <small class="text-caption text-medium-emphasis"
          >*indicates required field</small
        >
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

        <v-btn
          color="primary"
          text="Save"
          variant="tonal"
          @click="approve"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number;
}>();

const devicesStore = useDevicesStore();

const dialog = ref(false);
const loading = ref(false);
const data = ref({
  name: "",
  location: "",
  type: "",
});
const idComp = computed(() => props.id);
const index = computed(() =>
  devicesStore.data.findIndex((el) => el?.id === idComp.value)
);

onBeforeMount(() => {
  data.value = JSON.parse(JSON.stringify(devicesStore.data[index.value]));
});

const approve = async () => {
  if (
    data.value.name === "" ||
    data.value.type === "" ||
    data.value.location === ""
  ) {
    return;
  }
  console.log(idComp.value, data.value);
  const result = await devicesStore.update(idComp.value, data.value);
  console.log(result);
  devicesStore.data[index.value] = result;
  dialog.value = false;
};
</script>
