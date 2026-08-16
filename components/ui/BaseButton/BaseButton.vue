<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    type: 'button',
    disabled: false
  }
)
</script>

<template>
  <button
    :type="type"
    :class="$style.button"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style module src="./BaseButton.module.scss" />