<script setup lang="ts">
import nogi from 'nogi-api'

// const ret = nogi.getAllMember(['name', 'age', 'use', 'kana'])
const ret = nogi.getAllMember([], 'all')
console.log('ret', ret)

const shi = nogi.getMember('kubo shiori', 'default')
console.log('shi', shi)

const asu = nogi.getMember('asuka')
console.log('asu', asu)
</script>

<template></template>
