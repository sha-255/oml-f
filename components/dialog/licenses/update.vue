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
    <v-card prepend-icon="mdi-folder-arrow-left-right" title="Update license">
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
              :rules="[(v) => !!v || 'Company is required']"
              label="Company*"
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
const idComp = computed(() => props.id);
const index = computed(() =>
  licensesStore.data.findIndex((el) => el?.id === idComp.value)
);

onBeforeMount(() => {
  const raw = JSON.parse(JSON.stringify(licensesStore.data[index.value]));
  data.value.key = raw?.key;
  data.value.cost = raw?.cost;
  data.value.isActive = raw?.isActive;
  data.value.endDate = Date(raw?.endDate);
  data.value.startDate = Date(raw?.startDate);
  data.value.softwareId = raw?.software?.id;
  data.value.deviceId = raw?.device?.id;
  const softwareEntity = softwareStore.data.find(
    (e) => e?.id === data.value.softwareId
  );
  const deviceEntity = devicesStore.data.find(
    (e) => e?.id === data.value.deviceId
  );
  activeCompany.value = `${softwareEntity?.name} [${softwareEntity?.id}]`;
  activeDevice.value = `${deviceEntity?.name} [${deviceEntity?.id}]`;
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
  console.log(idComp.value, data.value);
  const result = await licensesStore.update(idComp.value, data.value);
  console.log(result);
  licensesStore.data[index.value] = result;
  dialog.value = false;
};
</script>
