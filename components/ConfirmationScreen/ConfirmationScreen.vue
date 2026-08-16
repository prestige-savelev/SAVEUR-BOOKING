<script setup lang="ts">
    import type { BookingFormData } from '~/types/booking'
import BaseButton from '../ui/BaseButton/BaseButton.vue';

    const props = defineProps<{
        booking: BookingFormData
    }>()

    defineEmits<{
        (e: 'reset'): void
    }>()

    const formattedDate = computed(() => {
        const date = new Date(props.booking.date)
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    })
    
</script>

<template>
  <div :class="$style.card">
    <div :class="$style.iconWrap">
      <svg :class="$style.icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6 9 17l-5-5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>

    <h1 :class="$style.title">Столик забронирован</h1>
    <p :class="$style.subtitle">Мы отправим SMS с подтверждением на указанный номер</p>

    <div :class="$style.details">
      <div :class="$style.detailRow">
        <span :class="$style.detailLabel">Имя</span>
        <span :class="$style.detailValue">{{ booking.name }}</span>
      </div>
      <div :class="$style.detailRow">
        <span :class="$style.detailLabel">Дата</span>
        <span :class="$style.detailValue">{{ formattedDate }}</span>
      </div>
      <div :class="$style.detailRow">
        <span :class="$style.detailLabel">Время</span>
        <span :class="$style.detailValue">{{ booking.time }}</span>
      </div>
      <div :class="$style.detailRow">
        <span :class="$style.detailLabel">Гостей</span>
        <span :class="$style.detailValue">{{ booking.guests }}</span>
      </div>
    </div>

    <BaseButton type="button" @click="$emit('reset')">
      Забронировать ещё
    </BaseButton>
  </div>
</template>

<style module src="./ConfirmationScreen.module.scss" />