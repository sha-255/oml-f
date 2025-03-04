<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        justify="center"
        v-for="(entity, idx) in software"
        :key="idx"
      >
        <v-card variant="flat" class="mx-10 mb-10">
          <v-card-item>
            <div>
              <div class="text-h6 mb-1">{{ entity?.name }}</div>
              <div class="text-overline mb-1">
                vendor: {{ entity?.vendor }} | days:
                {{ entity?.days_before_warning }}
              </div>
              <div class="text-caption" v-if="entity?.description">
                Description: {{ entity?.description }}
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <dialog-organization-remove :id="entity?.id" />
            <dialog-organization-update :id="entity?.id" />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" justify="center" v-if="!software.length">
        <v-skeleton-loader
          class="mx-10 mb-10 border"
          type="article"
          v-for="(_, idx) in [0, 1, 2, 3]"
          :key="idx"
        />
      </v-col>
    </v-row>
    <div class="text-center">
      <dialog-organization-add />
    </div>
  </v-container>
</template>

<script setup lang="ts">
const softwareStore = useSoftwareStore();
const software = computed(() => softwareStore.data);

onBeforeMount(async () => {
  await softwareStore.getData();
});
</script>
