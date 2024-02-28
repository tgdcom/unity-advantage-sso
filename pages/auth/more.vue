<template>
  <div>
    <h1 class="text-4xl">
      <span v-if="status === 'authenticated'">
        Logged in as "{{ data?.user?.name }}"
      </span>
      <span v-else>
        Not logged in.
      </span>

      <WelcomeButtonLink v-if="status === 'authenticated'" @click="signOut">
        Sign out
      </WelcomeButtonLink>
    </h1>

    <div class="my-12">
      <pre>Status: {{ status }}</pre>
      <pre v-if="data?.user">Session: {{ data }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { status, data, signOut } = useAuth()
</script>
