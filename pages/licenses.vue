<template>
  <v-container>
    <v-row>
      <template v-if="!licenses.length">
        <v-col
          cols="12"
          justify="center"
          v-for="(_, idx) in [0, 1, 2, 3]"
          :key="idx"
        >
          <v-skeleton-loader class="mx-1 my-1 border" type="article" />
        </v-col>
      </template>
      <template v-else>
        <v-col
          cols="12"
          justify="center"
          v-for="(entity, idx) in licenses"
          :key="idx"
        >
          <v-card variant="flat">
            <v-card-item>
              <div>
                <div class="text-h6 mb-1">{{ entity?.key }}</div>
                <div class="text-caption">
                  {{ JSON.stringify(entity, null, 4) }}
                </div>
              </div>
            </v-card-item>
            <v-card-actions>
              <dialog-licenses-remove :id="entity?.id" />
              <dialog-licenses-update :id="entity?.id" />
            </v-card-actions>
          </v-card>
        </v-col>
        <div class="text-center mx-auto mb-1">
          <dialog-licenses-add />
        </div>
      </template>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const licensesStore = useLicensesStore();
const licenses = computed(() => licensesStore.data);
</script>
