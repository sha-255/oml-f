<template>
  <div>
    <v-empty-state
      :headline="`Whoops, ${error?.statusCode}`"
      title="Page not found"
      text="The page you were looking for does not exist"
      icon="mdi-map-marker-remove-variant"
      action-text="Go back home"
      @click:action="onClickAction"
    ></v-empty-state>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const router = useRouter();

const props = defineProps({
  error: Object as () => NuxtError,
});

const onClickAction = () => {
  router.push("/");
};
</script>

<style scoped>
div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
