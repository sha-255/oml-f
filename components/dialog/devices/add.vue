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

    <v-card prepend-icon="mdi-folder-plus" title="Add device">
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
              label="Location*"
              required
              v-model="data.location"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Type*"
              required
              v-model="data.type"
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
const devicesStore = useDevicesStore();

const dialog = ref(false);
const loading = ref(false);
const data = ref({
  name: "",
  location: "",
  type: "",
});

const approve = async () => {
  if (
    data.value.name === "" ||
    data.value.location === "" ||
    data.value.type === ""
  ) {
    return;
  }
  const result = await devicesStore.add(data.value);
  console.log(result);
  devicesStore.data.push(result);
  dialog.value = false;
};
</script>
