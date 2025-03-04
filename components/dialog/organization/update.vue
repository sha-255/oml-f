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

    <v-card prepend-icon="mdi-account-sync" title="Update organization">
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
              label="Vendor*"
              required
              v-model="data.vendor"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Days before warning*"
              required
              type="number"
              v-model="data.days_before_warning"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col>
            <v-textarea
              label="Description"
              row-height="30"
              rows="4"
              variant="filled"
              auto-grow
              v-model="data.description"
            ></v-textarea>
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

const softwareStore = useSoftwareStore();

const dialog = ref(false);
const loading = ref(false);
const data = ref({
  name: "",
  description: "",
  vendor: "",
  days_before_warning: Number.NaN,
});
const idComp = computed(() => props.id);
const index = computed(() =>
  softwareStore.data.findIndex((el) => el?.id === idComp.value)
);

onBeforeMount(() => {
  data.value = JSON.parse(JSON.stringify(softwareStore.data[index.value]));
});

const approve = async () => {
  if (
    data.value.name === "" ||
    data.value.vendor === "" ||
    isNaN(data.value.days_before_warning)
  ) {
    return;
  }
  const result = await softwareStore.update(idComp.value, {
    name: data.value.name,
    description: data.value.description,
    vendor: data.value.vendor,
    daysBeforeWarning: data.value.days_before_warning,
  });
  console.log(result);
  softwareStore.data[index.value] = result;
  dialog.value = false;
};
</script>
