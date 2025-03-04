<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        icon="mdi-plus"
        size="small"
        color="success"
        :loading="loading"
        v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card prepend-icon="mdi-account-multiple-plus" title="Add organization">
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
              type="number"
              required
              v-model="data.daysBeforeWarning"
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
          color="success"
          text="Add"
          variant="tonal"
          @click="approve"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const softwareStore = useSoftwareStore();

const dialog = ref(false);
const loading = ref(false);
const data = ref({
  name: "",
  description: "",
  vendor: "",
  daysBeforeWarning: Number.NaN,
});

const approve = async () => {
  if (
    data.value.name === "" ||
    data.value.vendor === "" ||
    isNaN(data.value.daysBeforeWarning)
  ) {
    return;
  }
  const result = await softwareStore.add(data.value);
  console.log(result);
  softwareStore.data.push(result);
  dialog.value = false;
};
</script>
