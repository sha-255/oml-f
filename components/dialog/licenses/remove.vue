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
      prepend-icon="mdi-folder-remove"
      text="You will not be able to restore the data after deletion, do you want to continue?"
      title="Remove license"
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

const licensesStore = useLicensesStore();

const dialog = ref(false);
const loading = ref(false);
const idComp = computed(() => props.id);
const index = computed(() =>
  licensesStore.data.findIndex((el) => el?.id === idComp.value)
);

const approve = async () => {
  await licensesStore.remove(idComp.value);
  licensesStore.data = removeItemAll(
    licensesStore.data,
    licensesStore.data[index.value]
  );
  dialog.value = false;
};
</script>
