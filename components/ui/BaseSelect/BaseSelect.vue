<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: string
  options: string[]
  placeholder?: string
  error?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()
</script>

<template>
  <div :class="$style.field">
    <label :class="$style.label" :for="id">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      :class="[$style.select, error ? $style.inputError : '']"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      @blur="$emit('blur')"
    >
      <option value="" disabled>{{ placeholder || 'Выберите значение' }}</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
    <span :class="$style.errorText">{{ error || '' }}</span>
  </div>
</template>

<style module src="./BaseSelect.module.scss" />