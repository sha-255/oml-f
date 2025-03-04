<template>
  <v-dialog v-model="dialog" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        color="red-lighten-2"
        variant="outlined"
        :loading="loading"
        v-bind="activatorProps"
      >
        Delete
      </v-btn>
    </template>
    <v-card
      prepend-icon="mdi-account-multiple-minus"
      text="You will not be able to restore the data after deletion, do you want to continue?"
      title="Remove organization"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog = false" color="blue-lighten-1"> Cancel </v-btn>
        <v-btn @click="approve" color="red-lighten-1" variant="flat">
          Delete
        </v-btn>
      </template>
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
const idComp = computed(() => props.id);
const index = computed(() =>
  softwareStore.data.findIndex((el) => el?.id === idComp.value)
);

const approve = async () => {
  await softwareStore.remove(idComp.value);
  softwareStore.data = removeItemAll(
    softwareStore.data,
    softwareStore.data[index.value]
  );
  dialog.value = false;
};
</script>
