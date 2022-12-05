<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from "vue-demi";

const props = defineProps<{
  defaultContent: string;
  asideContent: string;
}>();
const emit = defineEmits(["change"]);

const defaultContent = computed(() => props.defaultContent ?? "default");
const asideContent = computed(() => props.asideContent ?? "aside");

const active = ref(true);

const activeChange = (change) => {
  active.value = change;
  emit("change", change);
};
</script>

<template>
  <div class="switch-button">
    <button
      :type="active ? 'primary' : 'default'"
      class="left"
      @click="activeChange(true)"
    >
      {{ defaultContent }}
    </button>

    <button
      :type="active ? 'default' : 'primary'"
      class="right"
      @click="activeChange(false)"
    >
      {{ asideContent }}
    </button>
  </div>
</template>

<style scoped>
.switch-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  width: 150px;
  border: 1px solid #d9d9d9;
}

.left {
  border-radius: 15px 0 0 15px;
}

.right {
  border-radius: 0 15px 15px 0;
}
</style>
