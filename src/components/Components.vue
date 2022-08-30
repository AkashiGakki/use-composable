<script setup lang="ts">
import obs from "observer-emit";

import useCall from "../hooks/useCall";

const ret = await useCall();
console.log("ret", ret);
</script>

<template>
  <div>{{ ret }}</div>
</template>
