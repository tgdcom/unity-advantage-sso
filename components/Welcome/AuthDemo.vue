<template>
  <div class="layout">
    <div class="group">
      <h1 class="heading">
        Authentication
      </h1>
      <p class="description">
        Nuxt user authentication and sessions through nuxt-auth. nuxt-auth wraps NextAuth.js/Auth.js to offer the reliability & convenience of a 12k star library to the nuxt 3 ecosystem with a native developer experience (DX)
      </p>
    </div>
    <div class="group">
      <p v-if="status === 'authenticated'">
        Logged in as "{{ data?.user?.name }}"
        (<NuxtLink to="/auth/more" class="hover-underline-animation">
          more info
        </NuxtLink>)
      </p>
      <p v-else>
        Not logged in.
      </p>

      <div class="actions">
        <WelcomeButtonLink href="https://sidebase.io/nuxt-auth/getting-started" target="_blank">
          Documentation
        </WelcomeButtonLink>
        <WelcomeButtonLink v-if="status !== 'authenticated'" @click="() => signIn('advantage')">
          Sign in
        </WelcomeButtonLink>
        <WelcomeButtonLink v-else @click="signOut">
          Sign out
        </WelcomeButtonLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { status, data, signIn, signOut } = useAuth()

</script>
