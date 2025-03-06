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
                  <div class="text-overline mb-1">
                    Software: {{ entity?.software.name }} | Vendor
                    {{ entity?.software.vendor }}

                    {{ entity?.device.location }}
                  </div>
                  <div class="text-overline mb-1">
                    Device: {{ entity?.device.name }} | Location:
                    {{ entity?.device.location }} | Type
                    {{ entity?.device.type }}
                  </div>
                  <div class="text-overline mb-1">
                    License start date: {{ entity?.startDate }} | License
                    expiration date:
                    {{ entity?.endDate }}
                  </div>
                  <div class="text-overline mb-1">
                    Status: {{ entity?.isActive ? "Active" : "Not active" }}
                  </div>
                  <div class="text-overline mb-1">
                    Price: {{ entity?.cost }}₽
                  </div>
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
