<template>
  <div>
    <h1 class="text-4xl">
      Logged in as "{{ data?.user?.name }}"
    </h1>

    <div class="my-12">
      <pre>Status: {{ status }}</pre>
      <pre v-if="data?.user">Session: {{ data }}</pre>
      <pre v-if="cookies">Cookies: {{ cookies }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { status, data, cookies } = useAuth()
</script>
