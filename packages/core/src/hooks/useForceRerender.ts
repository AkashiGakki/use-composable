import { ref } from "vue";

export const useForceRerender = () => {
  const renderKey = ref(0);

  const forceRerender = () => {
    renderKey.value += 1;
  };

  return {
    renderKey,
    forceRerender,
  };
};
