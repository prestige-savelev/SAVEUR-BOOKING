<script setup lang="ts">
defineProps<{
  id: string
  label: string
  modelValue: string | number
  type?: 'text' | 'tel' | 'number' | 'date'
  placeholder?: string
  error?: string
  min?: string | number
  max?: string | number
  step?: string | number
}>()

defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur'): void
}>()
</script>

<template>
  <div :class="$style.field">
    <label :class="$style.label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type || 'text'"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :class="[$style.input, error ? $style.inputError : '']"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur')"
    >
    <span :class="$style.errorText">{{ error || '' }}</span>
  </div>
</template>

<style module src="./BaseInput.module.scss" />