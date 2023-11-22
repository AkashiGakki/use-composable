<script lang="ts">
import { defineComponent } from "vue";

const avatar = require("../../assets/avatar.jpg");

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {
      avatar,
    };
  },
});
</script>

<template>
  <div>
    <img :src="icon || avatar" width="35" height="35" />
  </div>
</template>
