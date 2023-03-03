import { ref, onMounted } from "vue";

export const useMouse = () => {
  const x = ref(0);
  const y = ref(0);

  onMounted(() => {
    window.addEventListener("mousemove", (e: MouseEvent) => {
      x.value = e.clientX;
      y.value = e.clientY;
    });
  });

  return { x, y };
};
