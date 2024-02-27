<script setup lang="ts">
defineProps({
  blank: {
    type: Boolean,
    required: false,
    default: false
  },
  href: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <NuxtLink class="ButtonLink" :to="href" :target="blank ? '_blank' : undefined">
    <slot />
  </NuxtLink>
</template>

<style lang="postcss" scoped>
.ButtonLink {
  position: relative;
  padding: 5px 15px;
  color: white;
  background-image: linear-gradient(160deg, #d0112b, #610c17);
  border: 1px solid #610c17;
  border-radius: 0.3rem;
  cursor: pointer;
  user-select: none;
  transition: all 0.6s;

  &:hover {
    background-image: linear-gradient(175deg, #d0112b, #610c17);
  }

  &:_hover {
    box-shadow: 0 0 60px 2px #d0112b, 0.5rem 0.5rem 30px #d0112b;
  }
}
.ButtonLink:after {
  content: '';
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  left: 2px;
  border-radius: 0.75rem;
  pointer-events: none;
}
</style>
