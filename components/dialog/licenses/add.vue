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

    <v-card prepend-icon="mdi-folder-plus" title="Add license">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="4" sm="6">
            <v-select
              v-model="activeDevice"
              :items="devicesStore.data.map((el) => `${el?.name} [${el?.id}]`)"
              :rules="[(v) => !!v || 'Device is required']"
              label="Device*"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-select
              v-model="activeCompany"
              :items="softwareStore.data.map((el) => `${el?.name} [${el?.id}]`)"
              :rules="[(v) => !!v || 'Software is required']"
              label="Software*"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Unique key*"
              required
              v-model="data.key"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Cost*"
              required
              type="number"
              v-model="data.cost"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="Start date*"
              required
              type="date"
              v-model="data.startDate"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field
              label="End date*"
              required
              type="date"
              v-model="data.endDate"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-checkbox
              v-model="data.isActive"
              label="Is active"
              required
            ></v-checkbox>
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
const licensesStore = useLicensesStore();
const devicesStore = useDevicesStore();
const softwareStore = useSoftwareStore();

const activeDevice = ref();
const activeCompany = ref();

watch(activeDevice, (value: string) => {
  data.value.deviceId = getId(value);
});

watch(activeCompany, (value: string) => {
  data.value.softwareId = getId(value);
});

const dialog = ref(false);
const loading = ref(false);
const data = ref({
  softwareId: Number.NaN,
  deviceId: Number.NaN,
  key: "",
  startDate: "",
  endDate: "",
  cost: "",
  isActive: false,
});

const approve = async () => {
  if (
    data.value.key === "" ||
    data.value.startDate === "" ||
    data.value.endDate === "" ||
    data.value.cost === "" ||
    isNaN(data.value.softwareId) ||
    isNaN(data.value.deviceId)
  ) {
    return;
  }
  const result = await licensesStore.add(data.value);
  console.log(result);
  licensesStore.data.push(result);
  dialog.value = false;
};
</script>
