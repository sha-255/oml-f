<template>
  <v-container>
    <v-row>
      <template v-if="!devices.length">
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
          v-for="(entity, idx) in devices"
          :key="idx"
        >
          <v-card variant="flat">
            <v-card-item>
              <div>
                <div class="text-h6 mb-1">{{ entity?.name }}</div>
                <div class="text-overline mb-1">
                  location: {{ entity?.location }}
                </div>
                <div class="text-caption" v-if="entity?.type">
                  Type: {{ entity?.type }}
                </div>
              </div>
            </v-card-item>
            <v-card-actions>
              <dialog-devices-remove :id="entity?.id" />
              <dialog-devices-update :id="entity?.id" />
            </v-card-actions>
          </v-card>
        </v-col>
        <div class="text-center mx-auto mb-1">
          <dialog-devices-add />
        </div>
      </template>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const devicesStore = useDevicesStore();
const devices = computed(() => devicesStore.data);
</script>
